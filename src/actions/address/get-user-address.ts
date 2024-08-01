import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getUserAddress = async (
  userId: string
): Promise<Address | null> => {
  try {
    const userAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (!userAddress) return null;

    const { countryId, ...restAddress } = userAddress;
    return {
      ...restAddress,
      country: countryId,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
