import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

export default function ShopPage() {
  const products = initialData.products;
  return (
    <>
      <Title title="Tienda" subTitle="Todos los productos" className="mb-2" />
      <ProductGrid product={products} />
    </>
  );
}
