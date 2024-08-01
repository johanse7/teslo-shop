import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

type Props = {
  isPaid: boolean;
};

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        " flex items-center rounded py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          "bg-red-500": !isPaid,
          "bg-green-700": isPaid,
        }
      )}
    >
      <IoCardOutline size={30} />
      <span className="mx-2">
        {isPaid ? "Orden pagada" : "Pendiente de pago"}
      </span>
    </div>
  );
};
