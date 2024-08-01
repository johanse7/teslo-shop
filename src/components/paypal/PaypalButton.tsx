"use client";

import { paypalCheckPayment, setTransactionId } from "@/actions";
import type {
  CreateOrderActions,
  CreateOrderData,
  OnApproveActions,
  OnApproveData,
} from "@paypal/paypal-js";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

type Props = {
  orderId: string;
  amount: number;
};

export const PaypalButton = (props: Props) => {
  const { orderId, amount } = props;

  const roundedAmount = Math.round(amount * 100) / 100;

  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded mb-2"></div>
        <div className="h-11 bg-gray-300 rounded"></div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: roundedAmount.toString(),
            currency_code: "USD",
          },
        },
      ],
      intent: "CAPTURE"
    });
    const { ok, message } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error(message);
    }

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if (!details?.id) return;
    await paypalCheckPayment(details.id);
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
};
