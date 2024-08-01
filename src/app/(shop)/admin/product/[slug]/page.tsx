import { getProductBySlug, getProductCategory } from "@/actions";
import { Title } from "@/components";
import { notFound } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProductAdminPage({ params }: Props) {
  const { slug } = params;

  const [product, categories ] = await Promise.all([
    getProductBySlug(slug),
    getProductCategory(),
  ]);

  if (!product && slug !== "new") {
    notFound();
  }

  const title = slug === "new" ? "Nuevo producto" : "Editar Producto";
  return (
    <>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
