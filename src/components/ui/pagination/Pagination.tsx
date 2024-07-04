"use client";

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

type PaginationProps = {
  totalPages: number;
  className?: string;
};

export const Pagination = (props: PaginationProps) => {
  const { totalPages, className } = props;
  const path = usePathname();
  const seacrchParams = useSearchParams();
  const currentPage = Number(seacrchParams.get("page")) || 1;

  const createPageUrl = (page: number | string) => {
    const params = new URLSearchParams(seacrchParams);
    if (page === "...") {
      return `${path}?${params.toString()}`;
    }

    if (+page <= 0) {
      return `${path}`;
    }
    if (+page > totalPages) return `${path}?${params.toString()}`;

    params.set("page", page.toString());
    return `${path}?${params.toString()}`;
  };

  const allPages = generatePaginationNumbers(currentPage, totalPages);
  return (
    <div className={clsx("flex justify-center text-center", className)}>
      <nav aria-label="Page navigation">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className={clsx(
                "page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                {
                  "pointer-events-none text-gray-500": currentPage === 1,
                }
              )}
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {allPages.map((page, index) => {
            return (
              <li key={`item-page-${page}-${index}`}>
                <Link
                  className={clsx(
                    "relative block py-1.5 px-3 rounded border-0  outline-none transition-all duration-300 shadow-md text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-md",
                    {
                      "bg-blue-600 hover:!bg-blue-700 text-white hover:text-white shadow-md":
                        currentPage === page,
                    }
                  )}
                  href={createPageUrl(page)}
                >
                  {page}
                </Link>
              </li>
            );
          })}

          <li className="page-item">
            <Link
              className={clsx(
                "page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300  text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                {
                  "pointer-events-none text-gray-500":
                    currentPage === totalPages,
                }
              )}
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
