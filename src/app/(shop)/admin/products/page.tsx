// https://tailwindcomponents.com/component/hoverable-table
import { getPaginateProductsWithImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Link from "next/link";

type OrdersAdminPageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function OrdersAdminPage({
  searchParams,
}: OrdersAdminPageProps) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const { products, totalPages = 0 } = await getPaginateProductsWithImages({
    page,
  });

  return (
    <>
      <Title title="Manteniento de productos" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genero
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Stock
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              ({ id, title, price, sizes, slug, images, gender }) => (
                <tr
                  key={id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/product/${slug}`}>
                      <ProductImage
                        src={images[0]}
                        width={100}
                        height={100}
                        alt={title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/admin/product/${slug}`}
                      className="hover:underline"
                    >
                      {title}
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {currencyFormat(price)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {gender}
                  </td>

                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {gender}
                  </td>

                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {sizes.join(", ")}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        {totalPages && <Pagination totalPages={totalPages} className="mt-40" />}
      </div>
    </>
  );
}
