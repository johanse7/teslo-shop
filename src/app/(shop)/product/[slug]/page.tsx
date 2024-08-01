export const revalidate = 604800; // 7 days;

import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // fetch data
  const product = await getProductBySlug(slug);

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/product/${product?.images?.[1]}`],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { title, price, description, images } = product;

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* slideshow*/}
      <div className="col-span-1 md:col-span-2">
        {/* mobile slideshow */}
        <ProductMobileSlideshow
          title={title}
          images={images}
          className="block md:hidden"
        />
        {/* desktop slideshow */}
        <ProductSlideshow
          title={title}
          images={images}
          className="hidden md:block"
        />
      </div>
      {/* details */}
      <div className="col-span-1 px-5 ">
        <StockLabel slug={slug} />
        <h2 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {title}
        </h2>
        <p className="text-lg mb-5">${price}</p>
        <AddToCart product={product} />
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{description}</p>
      </div>
    </div>
  );
}
