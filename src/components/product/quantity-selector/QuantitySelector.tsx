"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

type QuantitySelectorProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

export const QuantitySelector = (props: QuantitySelectorProps) => {
  const { quantity = 1, onQuantityChange } = props;

  const handleQualityChange = (value: number) => () => {
    const resultValue = quantity + value;
    if (resultValue < 1) return;

    onQuantityChange(resultValue);
  };

  return (
    <div className="flex">
      <button onClick={handleQualityChange(-1)} disabled={quantity === 1}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
      </span>
      <button onClick={handleQualityChange(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
