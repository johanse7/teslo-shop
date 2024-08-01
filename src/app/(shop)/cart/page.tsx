import { Title } from "@/components";
import Link from "next/link";
import { OrderSummary } from "./ui/OrderSumary";
import { ProductInCart } from "./ui/ProductInCart";

export default function CardPage() {
  // redirect("/empty");
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className=" fel flex-col w-[1000px]">
        <Title title="carrito" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}

          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar mas items</span>
            <Link href="/" className="underline mb-5">
              Continua comprando
            </Link>

            {/* items */}
            <ProductInCart />
          </div>
          {/* checkout */}

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <OrderSummary />
            <Link
              className="flex btn-primary mt-5 mb-2 w-full"
              href="/checkout/address"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
