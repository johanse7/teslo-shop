"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const updateUserRole = async (userId: string, role: string) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== "admin") {
    return {
      ok: false,
      message: "Debe estar auteticado",
    };
  }

  try {
    if (role in Role) {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role: role as Role },
      });

      if (!updatedUser) {
        return {
          ok: false,
          message: "Debe se pudo actualizar el role del user",
        };
      }

      revalidatePath("/admin/users");
      return {
        ok: true,
      };
    }

    throw new Error();
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo actualizar el rol del usuario",
    };
  }
};
