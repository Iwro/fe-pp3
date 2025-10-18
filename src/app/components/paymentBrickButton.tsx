"use client";

// import { useEffect, useState } from "react";
import { Payment } from "@mercadopago/sdk-react";

type Props = {
  preference: string;
  amount: number
};

export const PaymentBrickButton = ({preference, amount}:Props)=> {
//   const [preferenceId, setPreferenceId] = useState<string | null>(null);

//   const generarPreference = async () => {
//     const res = await fetch("http://localhost:3001/api/pagos/create-preference", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ turno_id: 123 }), // id del turno o lo que uses
//     });
//     const data = await res.json();
//     setPreferenceId(data.preferenceId);
//   };

//   useEffect(() => {
//     generarPreference();
//   }, []);

//   if (!preferenceId) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Pagar turno</h1>
      <div id="payment_container">
        <Payment
          initialization={{
            amount: amount, // 💰 acá ponés el monto
            preferenceId:preference,
          }}
          customization={{
            paymentMethods: {
              creditCard: "all",
              debitCard: "all",
            },
          }}
          onSubmit={async (formData) => {
            console.log("Datos enviados a MP:", formData);
            // podés hacer lógica extra acá si querés
            return formData;
          }}
          onReady={() => {
            console.log("Payment Brick listo");
          }}
          onError={(error) => {
            console.error("Error en Payment Brick", error);
          }}
        />
      </div>
    </div>
  );
}