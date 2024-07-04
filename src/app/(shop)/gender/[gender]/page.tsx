import { getPaginateProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

type CategoryProps = {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryProps) {
  const { gender } = params;
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const labels: Record<Gender, string> = {
    men: "hombres",
    women: "mujeres",
    kid: "niños",
    unisex: "Para todos",
  };

  const label = labels[gender as keyof typeof labels];

  if (!label) {
    notFound();
  }

  const { products, totalPages } = await getPaginateProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if (!products.length) {
    redirect("/");
  }
  return (
    <>
      <Title
        title={`Artirculos de ${label}`}
        subTitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid product={products} />
      <Pagination totalPages={totalPages} className="mt-10 mb-32" />
    </>
  );
}
