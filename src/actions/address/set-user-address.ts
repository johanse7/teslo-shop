"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  const newAddress = await createOrReplaceAddress(address, userId);

  return {
    ok: true,
    data: newAddress,
  };
};

export const createOrReplaceAddress = async (
  address: Address,
  userId: string
) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city,
    };

    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });
    return updatedAddress;
  } catch (error) {
    console.error(error);
    throw new Error("No se pudo grabar la direccion");
  }
};

