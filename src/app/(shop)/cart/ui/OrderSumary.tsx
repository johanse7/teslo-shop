"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const { tax, total, subTotal, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  if (!loaded) return <p>Loading...</p>;
  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 articulo" : `${itemsInCart} articulos`}
      </span>
      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)} </span>
      <span>Impuestos</span>
      <span className="text-right">{currencyFormat(tax)} </span>
      <span className="text-2xl mt-5">Total:</span>
      <span className="text-right text-2xl mt-5">{currencyFormat(total)} </span>
    </div>
  );
};
