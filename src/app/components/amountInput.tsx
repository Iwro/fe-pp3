import { useState, useEffect } from "react";
import { fetchWithAuth } from "../utils/api";
import { toast } from "react-toastify";

type PrecioProps = {
  id: number;
  montoBackend: number; // el precio que te llega del backend
//   onGuardar: (nuevoMonto: number) => void; // función para enviar el nuevo monto
};

const PrecioInput: React.FC<PrecioProps> = ({ montoBackend, id }) => {
  const [monto, setMonto] = useState<number>(montoBackend);

  const handleGuardar = async ()=>{
    const response = await fetchWithAuth(`http://localhost:3001/api/turnos/precio/${id}`, {method: "PUT",
          body: JSON.stringify({precio: monto })
    })
        const data = await response.json();
        console.log(data);
        
        if (response.status == 200) {
            toast.success("Precio actualizado correctamente")
        } else if(response.status !== 200) {
            toast.error("Algo salió mal")
        }
    }

  useEffect(() => {
    const updateAmount = async ()=>{

    }
    updateAmount()
  }, []);

  // Si el monto del backend cambia, lo sincronizamos
//   useEffect(() => {
//     setMonto(montoBackend);
//   }, [montoBackend]);

//   console.log(montoBackend);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonto(Number(e.target.value));
  };

//   const handleGuardar = () => {
//     onGuardar(monto);
//   };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <input
        type="number"
        value={monto?monto:""}
        placeholder="Precio"
        onChange={handleChange}
        style={{ padding: "8px", fontSize: "16px" }}
      />
      <button onClick={handleGuardar} style={{ padding: "8px 12px" }}>
        Guardar
      </button>
    </div>
  );
};

export default PrecioInput;