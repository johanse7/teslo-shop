import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  const { title, price, description, sizes, images } = product;

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* slideshow*/}
      <div className="col-span-1 md:col-span-2">
        {/* mobile slideshow */}
        <ProductMobileSlideshow title={title} images={images} className="block md:hidden" />
        {/* desktop slideshow */}
        <ProductSlideshow title={title} images={images} className="hidden md:block" />
      </div>
      {/* details */}
      <div className="col-span-1 px-5 ">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {title}
        </h1>
        <p className="text-lg mb-5">${price}</p>
        {/* selector de talla */}
        <SizeSelector availableSize={sizes} selectedSize={sizes[0]} />
        {/* selector de cantidad */}

        <QuantitySelector />
        {/* add cart button */}
        <button className="btn-primary my-5">Agregar el carrito</button>
        {/* description */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{description}</p>
      </div>
    </div>
  );
}
