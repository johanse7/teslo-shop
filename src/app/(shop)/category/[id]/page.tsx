import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

export type CategoryProps = {
  params: {
    id: Category;
  };
};

export default function CategoryPage({ params }: CategoryProps) {
  const { id } = params;

  const labels: Record<Category, string> = {
    men: "hombres",
    women: "mujeres",
    kid: "niños",
    unisex: "Para todos",
  };

  const products = initialData.products.filter(({ gender }) => gender === id);
  // if (id === "kids") return notFound();

  return (
    <>
      <Title
        title={`Artirculos de ${labels[id]}`}
        subTitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid product={products} />
    </>
  );
}
