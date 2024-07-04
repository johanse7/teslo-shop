export const revalidate = 60; //seconds

import { getPaginateProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    page?: string;
  };
};

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { products, totalPages } = await getPaginateProductsWithImages({
    page,
  });

  if (!products.length) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductGrid product={products} />
      <Pagination totalPages={totalPages} className="mt-10 mb-32" />
    </>
  );
}
