"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import type { CardProduct, Product, Size } from "@/interfaces/";
import { useCartStore } from "@/store";
import { useState } from "react";

type AddToCartProps = {
  product: Product;
};

export const AddToCart = ({ product }: AddToCartProps) => {
  const { sizes } = product;
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CardProduct = {
      id: product.id,
      slug: product.slug,
      size,
      quantity,
      image: product.images[0],
      title: product.title,
      price: product.price,
    };

    addProductToCart(cartProduct);

    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {/* selector de talla */}
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Debe selecionar una talla*
        </span>
      )}
      <SizeSelector
        availableSize={sizes}
        selectedSize={size}
        onSizeChanged={setSize}
      />
      {/* selector de cantidad */}

      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      {/* add cart button */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar el carrito
      </button>
    </>
  );
};
