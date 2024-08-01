"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginateUser = async (page = 1, take = 12) => {
  const session = await auth();
  const user = session?.user;

  if (user?.role !== "admin") {
    return {
      ok: false,
      message: "Debe estar auteticado",
    };
  }

  const usersPromise = prisma.user.findMany({
    orderBy: {
      name: "desc",
    },
    take,
    skip: (page - 1) * take,
  });

  const totalUsersPromise = prisma.user.count();

  const [users, totalUsers] = await Promise.all([
    usersPromise,
    totalUsersPromise,
  ]);

  const totalPages = Math.ceil(totalUsers / take);

  return {
    ok: true,
    users,
    totalPages,
  };
};
