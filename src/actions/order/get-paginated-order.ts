"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderPaginatedOrders = async () => {
  try {
    const session = await auth();
    const user = session?.user;
    console.log(user?.id);
    if (!user?.id || user?.role !== "admin") {
      return {
        ok: false,
        message: "Debe estar auteticado",
      };
    }

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        OrderAddress: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    return { ok: true, orders };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo cargar las ordernes",
    };
  }
};
