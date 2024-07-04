"use server";

import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

type PaginationOptions = {
  page?: number;
  take?: number;
  gender?: Gender;
};

export const getPaginateProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 0) page = 1;

  try {
    const filters = gender
      ? {
          gender: gender,
        }
      : undefined;
    const [productsDB, totalCount] = await Promise.all([
      prisma.product.findMany({
        take,
        skip: (page - 1) * take,
        include: {
          ProductImage: {
            take: 2,
            select: { url: true },
          },

          // category:{
          //   select:{
          //     name: true
          //   }
          // }
        },
        where: filters,
      }),
      prisma.product.count({ where: filters }),
    ]);

    const totalPages = Math.ceil(totalCount / take);

    const products = productsDB.map<Product>((product) => {
      return {
        ...product,
        images: product.ProductImage.map(({ url }) => url),
        type: "hats",
      };
    });

    return {
      currentPage: page,
      totalPages,
      totalPage: 10,
      products,
    };
  } catch (error) {
    console.error(error);
    throw new Error("no se pudo cargar los productos");
  }
};


