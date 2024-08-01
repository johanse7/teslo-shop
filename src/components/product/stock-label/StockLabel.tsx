"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

type StockLabelProps = {
  slug: string;
};

export const StockLabel = (props: StockLabelProps) => {
  const { slug } = props;
  const [stock, setStock] = useState(0);
  const [isLoadng, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const stock = await getStockBySlug(slug);
      setStock(stock);
      setIsLoading(false);
    };

    getStock();
  }, [slug]);

  return (
    <>
      {!isLoadng ? (
        <h1 className={`${titleFont.className} antialiased font-bold text-md`}>
          Stock {stock}
        </h1>
      ) : (
        <h1
          className={`${titleFont.className} antialiased font-bold text-md h-8 bg-gray-200 animate-pulse`}
        ></h1>
      )}
    </>
  );
};
