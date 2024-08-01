"use server";

import { PaypalOrderResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "No se existe el token",
    };
  }

  const resp = await verifyPaypalPayment(paypalTransactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }
  const { status, purchase_units } = resp;

  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "No se ha pagado en paypal",
    };
  }
  try {
    const orderUpdated = await prisma.order.update({
      where: { id: orderId },
      data: { isPaid: true, paidAt: new Date() },
    });

    if (!orderUpdated)
      return {
        ok: false,
        message: "No se actualizo la orden paa pago",
      };
    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se ha realizado",
    };
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
  const secret = process.env.PAYPAL_SECRET ?? "";
  const url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(`${clientId}:${secret}`, "utf-8").toString(
    "base64"
  );

  const urlencoded = new URLSearchParams();

  urlencoded.append("grant_type", "client_credentials");

  try {
    const result = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${base64Token}`,
      },
      method: "POST",
      body: urlencoded,
      cache: "no-store",
    }).then((r) => r.json());

    return result?.access_token?.toString();
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  token: string
): Promise<PaypalOrderResponse | null> => {
  const url = process.env.PAYPAL_ORDERS_URL;

  try {
    const result = await fetch(`${url}/${paypalTransactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }).then((r) => r.json());

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
