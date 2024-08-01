"use server";

import prisma from "@/lib/prisma";

export const getCountries = async () => {
  try {
    return await prisma.country.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
