// src/components/WalletBrickButton.tsx
import { useEffect } from "react";
import { Wallet } from "@mercadopago/sdk-react";

type Props = {
  preferenceId: string;
};

export const WalletBrickButton = ({ preferenceId }: Props) => {
//   const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!preferenceId) return;
  }, [preferenceId]);

  return (
    <div style={{ width: "100%", maxWidth: 400, margin: "auto" }}>
      {preferenceId && (<Wallet
      key={preferenceId}
        initialization={{ preferenceId }}
      />)}
    </div>
    
  );
};