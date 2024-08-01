"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

type ProductToOrder = {
  productId: string;
  quantity: number;
  size: Size;
};

export const placeOrder = async (
  productsIds: ProductToOrder[],
  address: Address
) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return {
        ok: false,
        message: "No hay session de usuario",
      };
    }

    const products = await prisma.product.findMany({
      where: { id: { in: productsIds.map((p) => p.productId) } },
    });

    const itemsInOrder = productsIds.reduce((total, product) => {
      return total + product.quantity;
    }, 0);

    const { subTotal, tax, total } = productsIds.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(
          (product) => product.id === item.productId
        );

        if (!product) throw new Error(`${item.productId} no existe`);

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;
        return totals;
      },
      {
        subTotal: 0,
        tax: 0,
        total: 0,
      }
    );

    const prismaTx = await prisma.$transaction(async (tx) => {
      //1. update product stock

      const updatedProductPromises = products.map((product) => {
        const productQuantity = productsIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            //inStock: product.inStock - productQuantity,
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updateProducts = await Promise.all(updatedProductPromises);

      updateProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      //2. create header order
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productsIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,

                productId: p.productId,
              })),
            },
          },
        },
      });

      //3.   create order address

      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return { order, orderAddress, updateProducts };
    });

    return { ok: true, order: prismaTx.order };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error?.message,
    };
  }
};
