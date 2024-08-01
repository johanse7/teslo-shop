"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const [isClient, setIsClient] = useState(false);
  const [isPlacingOrder, setIsplacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const cleanCart = useCartStore((state) => state.cleanCart);

  const router = useRouter();

  const { tax, total, subTotal, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsplacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, address);

    if (!resp.ok) {
      setIsplacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    cleanCart();
    router.replace(`/orders/${resp.order?.id}`);
  };

  if (!isClient) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>
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
        <span className="text-right text-2xl mt-5">
          {currencyFormat(total)}{" "}
        </span>
      </div>

      {/* href="/orders/123" */}
      {errorMessage && <p className="text-red-500">{errorMessage} </p>}
      <button
        className={clsx("flex mt-5 mb-2 w-full", {
          "btn-primary": !isPlacingOrder,
          "btn-disabled": isPlacingOrder,
        })}
        disabled={isPlacingOrder}
        onClick={onPlaceOrder}
      >
        Colocar orden
      </button>
    </div>
  );
};
