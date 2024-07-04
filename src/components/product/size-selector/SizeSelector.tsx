import type { Size } from "@/interfaces";
import clsx from "clsx";

export type SizeSelectorProps = {
  selectedSize?: Size;
  availableSize: Size[];
  onSizeChanged: (size: Size) => void;
};

export const SizeSelector = (props: SizeSelectorProps) => {
  const { availableSize, selectedSize, onSizeChanged } = props;

  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex">
        {availableSize.map((size) => (
          <button
            key={size}
            className={clsx("mx-2 hover:underline text-lg", {
              underline: size === selectedSize,
            })}
            onClick={() => onSizeChanged(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
