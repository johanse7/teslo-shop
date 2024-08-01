"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const orderUpdate = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId },
    });

    if (!orderUpdate) {
      return {
        ok: false,
        message: "No se encontro la orden",
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se pudo actualizar la orden",
    };
  }
};
