"use client";

import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProductGridItemProps = {
  product: Product;
};

export const ProductGridItem = ({ product }: ProductGridItemProps) => {
  const linkToProduct = `/product/${product.slug}`;

  const [displayImage, setDisplayImage] = useState(product.images[0]);

  const handleMouseEnter = () => setDisplayImage(product.images[1]);
  const handleMouseLeave = () => setDisplayImage(product.images[0]);

  return (
    <article className="rounded-md overflow-hidden fade-in">
      <Link href={linkToProduct}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounde"
          width={500}
          height={500}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          priority
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-600" href={linkToProduct}>
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </article>
  );
};
