// https://tailwindcomponents.com/component/hoverable-table
import { getOrderPaginatedOrders } from "@/actions";
import { Title } from "@/components";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function OrdersAdminPage() {
  const { ok, orders = [] } = await getOrderPaginatedOrders();

  if (!ok) {
    redirect("/");
  }

  return (
    <>
      <Title title="Orders admin" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map(({ id, OrderAddress, isPaid }) => (
              <tr
                key={id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {id}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {OrderAddress?.firstName} {OrderAddress?.lastName}
                </td>
                <td
                  className={clsx(
                    "flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap",
                    {
                      "text-green-800": isPaid,
                      "text-red-500": !isPaid,
                    }
                  )}
                >
                  <IoCardOutline />
                  <span className="mx-2">
                    {isPaid ? "Pagada" : "No pagada"}
                  </span>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href={`/orders/${id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
