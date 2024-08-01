"use order";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderBySessionUser = async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return {
        ok: false,
        message: "Debe estar auteticado",
      };
    }

    const orders = await prisma.order.findMany({
      where: { userId },
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
