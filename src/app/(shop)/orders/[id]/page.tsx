import { getOrderById } from "@/actions";
import { OrderStatus, PaypalButton, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

type OrderByIdPageProps = {
  params: {
    id: string;
  };
};
export default async function OrderByIdPage({ params }: OrderByIdPageProps) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }
  const address = order?.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className=" fel flex-col w-[1000px]">
        <Title title={`Orden # ${id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}

          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* items */}

            {order?.OrderItem?.map((item) => (
              <div key={item.product.slug} className="flex gap-3 mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  width={100}
                  height={100}
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>

                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* checkout */}

          <div className="bg-white rounded-xl shadow-xl p-7">
            <div className="mb-10">
              <p className="text-xl">
                {address?.firstName} {address?.lastName}
              </p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.postalCode}</p>
              <p>
                {address?.city}, {address?.country?.name}
              </p>
              <p>{address!.phone}</p>
            </div>

            {/* divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>
            <div className="grid grid-cols-2 mb-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order!.itemsInOrder} articulos{" "}
              </span>
              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}{" "}
              </span>
              <span>Impuestos</span>
              <span className="text-right">{currencyFormat(order!.tax)} </span>
              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right text-2xl mt-5">
                {currencyFormat(order!.total)}
              </span>
            </div>

            {!order!.isPaid ? (
              <div className="relative z-0">
                <PaypalButton orderId={id} amount={order!.total} />
              </div>
            ) : (
              <OrderStatus isPaid={true} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
