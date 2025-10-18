"use client";

import { ReactNode, useEffect } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";

type Props = {
  children: ReactNode;
};

export function MercadoPagoProvider({ children }: Props) {
  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, { locale: "es-AR" });
  }, []);

  return <>{children}</>;
}