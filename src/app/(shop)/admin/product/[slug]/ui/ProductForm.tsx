"use client";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import type { ProductImage as ProductWithImage } from "@/interfaces";
import { Category, Product } from "@/interfaces";
import type { CategoryData } from "@/interfaces/category.interface";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: Array<CategoryData>;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

type FormInputs = {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: Array<string>;
  tags: string;
  gender: Category;
  categoryId: string;
  images: FileList;
};

export const ProductForm = ({ product, categories = [] }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
    setValue,
    control,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product?.tags?.join(", "),
      sizes: product?.sizes ?? [],
      images: undefined,
    },
  });
  const router = useRouter();

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;
    if (product?.id) formData.append("id", product.id);
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    if (images) {
      debugger;
      for (let index = 0; index < images.length; index++) {
        formData.append("images", images[index]);
      }
    }

    const { ok, product: productResult } = await createUpdateProduct(formData);

    if (!ok) {
      alert("No se pudo actualizar");
      return;
    }

    router.replace(`/admin/product/${productResult?.slug}`);
  };

  const sizesValues = useWatch({ control, name: "sizes" });

  const handleChangeSize = (size: string) => {
    const sizes = getValues("sizes");

    if (sizes.includes(size)) {
      const restValues = sizes.filter((value) => value !== size);
      setValue("sizes", restValues);
      return;
    }

    setValue("sizes", [...sizes, size]);
  };

  return (
    <form
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => handleChangeSize(size)}
                className={clsx(
                  " p-2 cursor-pointer  mb-2 w-14 border rounded-md transition-all text-center",
                  {
                    "bg-blue-500 text-white": sizesValues.includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
              {...register("images")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((image) => {
              return (
                <div key={image.id}>
                  <ProductImage
                    src={image.url}
                    alt={product.title ?? ""}
                    width={300}
                    height={300}
                    className="rounded-t shadow-md"
                  />
                  <button
                    type="button"
                    className="btn-danger w-full rounded-b-xl"
                    onClick={() => deleteProductImage(image.id, image.url)}
                  >
                    Eliminar
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
};
