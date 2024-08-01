"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { z } from "zod";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string().min(3),

  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  categoryId: z.string().uuid(),
  sizes: z.coerce
    .string()
    .min(0)
    .transform((val) => val.split(",")),
  gender: z.nativeEnum(Gender),
  tags: z.string(),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);
  console.log(productParsed);
  if (!productParsed.success) {
    return {
      ok: false,
    };
  }

  const product = productParsed.data;
  console.log({ product });
  product.slug = product.slug.replace(/ /g, "-").trim();

  const { id, ...rest } = product;
  try {
    const prismTx = await prisma.$transaction(async (tx) => {
      let product: Product;

      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLocaleLowerCase());

      if (id) {
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        product = await tx.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }
      console.log({ product });

      const images = formData.getAll("images") as Array<File>;
      if (images) {
        const imagesUrl = await uploadImages(images);
        if (!imagesUrl) throw new Error("No se cargaron las images");

        await prisma.productImage.createMany({
          data: imagesUrl.map((image) => ({
            url: image,
            productId: product.id,
          })),
        });
      }

      return { product };
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/product/${product.slug}`);
    return {
      ok: true,
      product: prismTx.product,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

const uploadImages = async (images: Array<File>) => {
  console.log({ images });
  try {
    const uploadPromises = images.map(async (image) => {
      const buffer = await image.arrayBuffer();
      const bas64Image = Buffer.from(buffer).toString("base64");
      return cloudinary.uploader
        .upload(`data:image/png;base64,${bas64Image}`)
        .then((response) => response.secure_url);
    });

    const uploadImages = await Promise.all(uploadPromises);
    return uploadImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
