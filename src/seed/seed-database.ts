
import prisma from '../lib/prisma';
import { initialData } from "./seed";

async function main() {


  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const { products, categories } = initialData

  // category
  await prisma.category.createMany({
    data: categories.map((name) => ({ name }))
  })

  // productos

  const allCategories = await prisma.category.findMany()

  const categoriesDB = allCategories.reduce((prev, current) => {
    return {
      ...prev,
      [current.name.toLowerCase()]: current.id
    }
  }, {} as Record<string, string>)

  initialData.products.forEach(async (product) => {
    const { type, images, ...restPrducts } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...restPrducts,
        categoryId: categoriesDB[product.type.toLowerCase() as keyof typeof categoriesDB]
      }
    })

    const imageData = images.map((image) => ({
      productId: dbProduct.id,
      url: image
    }))

    await prisma.productImage.createMany({
      data: imageData
    })

  })
  // await prisma.product.createMany({
  //   data: productsData
  // })

  // const productsDB = await prisma.product.findMany()

  // productsDB.forEach((productDB) => {
  //   const { id, slug } = productDB
  //   const { images } = products.find((product) => slug === product.slug) ?? {}
  //   images?.forEach((image) => {
  //     console.log({ prductId: id, url: image })
  //   })
  // })
  console.log("seed ejecutado")
}





(() => {

  if (process.env.NODE_ENV === "production") return

  main()
})()