import { Title } from "@/components";
import Link from "next/link";
import { PlaceOrder } from "./ui/PlaceOrder";
import { ProductInCart } from "./ui/ProductInCart";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className=" fel flex-col w-[1000px]">
        <Title title="Verificar orden" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}

          <div className="flex flex-col mt-5">
            <span className="text-xl">Revisa tus productos</span>
            <Link href="/cart" className="underline mb-5">
              Editar Carrito
            </Link>

            {/* items */}

            <ProductInCart />
          </div>
          {/* checkout */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
