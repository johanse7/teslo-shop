import { Product } from "@/interfaces";
import { ProductGridItem } from "./ProductGridItem";

type ProductGridType = {
  product: Product[];
};

export const ProductGrid = (props: ProductGridType) => {
  const { product } = props;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {product.map((product) => (
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
};
