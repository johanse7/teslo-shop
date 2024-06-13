import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

type OrderByIdPageProps = {
  params: {
    id: string;
  };
};
export default function OrderByIdPage({ params }: OrderByIdPageProps) {
  const { id } = params;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className=" fel flex-col w-[1000px]">
        <Title title={`Orden # ${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}

          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                " flex items-center rounded py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Pendiente de pago</span>
            </div>

            {/* items */}

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex gap-3 mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x3</p>

                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          {/* checkout */}

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Jhoan sebastian rodrigez</p>
              <p>Av siempre viva</p>
              <p>Ciudad de Mexico</p>
              <p>Co 12344</p>
            </div>

            {/* divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>
            <div className="grid grid-cols-2 mb-2">
              <span>No. Productos</span>
              <span className="text-right">4 items </span>
              <span>Subtotal</span>
              <span className="text-right">$ 100 </span>
              <span>Impuestos</span>
              <span className="text-right">$ 100 </span>
              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right text-2xl mt-5">$ 100 </span>
            </div>

            <div
              className={clsx(
                " flex items-center rounded py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Pendiente de pago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
