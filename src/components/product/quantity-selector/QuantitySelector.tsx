"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

type QuantitySelectorProps = {
  quantity: number;
};

export const QuantitySelector = (props: QuantitySelectorProps) => {
  const { quantity = 1 } = props;
  const [count, setCount] = useState(quantity);

  const handleQualityChange = (value: number) => () => {
    const resultValue = count + value;
    if (resultValue < 1) return;
    setCount(resultValue);
  };

  return (
    <div className="flex">
      <button onClick={handleQualityChange(-1)} disabled={count === 1}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {count}
      </span>
      <button onClick={handleQualityChange(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
