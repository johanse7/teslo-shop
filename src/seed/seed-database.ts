import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { products, categories, users } = initialData;

  //users

  await prisma.user.createMany({
    data: users,
  });
  // category
  await prisma.category.createMany({
    data: categories.map((name) => ({ name })),
  });

  // productos

  const allCategories = await prisma.category.findMany();

  const categoriesDB = allCategories.reduce((prev, current) => {
    return {
      ...prev,
      [current.name.toLowerCase()]: current.id,
    };
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const { type, images, ...restPrducts } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...restPrducts,
        categoryId:
          categoriesDB[product.type.toLowerCase() as keyof typeof categoriesDB],
      },
    });

    const imageData = images.map((image) => ({
      productId: dbProduct.id,
      url: image,
    }));

    await prisma.productImage.createMany({
      data: imageData,
    });
  });

  // counties
  await prisma.country.createMany({ data: countries });
  console.log("seed ejecutado");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
