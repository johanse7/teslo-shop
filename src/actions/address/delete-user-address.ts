"use server";

import prisma from "@/lib/prisma";

export const deleteAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({ where: { userId } });

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se pudo eliminar la dirrecion",
    };
  }
};
