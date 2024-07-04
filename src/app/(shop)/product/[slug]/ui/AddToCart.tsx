"use client";

import { QuantitySelector, SizeSelector } from "@/components";
import { Product } from "@/interfaces/";
import { useState } from "react";

type AddToCartProps = {
  product: Product;
};

export const AddToCart = ({ product }: AddToCartProps) => {
  const { sizes } = product;
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
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
