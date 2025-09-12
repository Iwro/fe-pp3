'use client'
import { useEffect, useState } from "react";
import styles from "./myAppointments.module.css"
import { fetchWithAuth } from "../utils/api";

type Reserva = {
  id: number;
  cliente_id: number;
  taller_id: number;
  fecha: string;
  hora: string;
  estado: string;
};
export default function MyAppointments () {
    const [myAppointments, setMyAppointments] = useState<Reserva[]>();

    useEffect(() => {
        const fetchAppointments = async ()=>{
            const response = await fetchWithAuth("http://localhost:3001/api/turnos/mis-reservas", {method: "GET"});
            const data = await response.json();
            setMyAppointments(data);
            console.log(typeof data);
            console.log("mis citas: ",data);
            
        }
        fetchAppointments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
    <main className={styles.main}>
      <h1 className={styles.title}>Mis reservas</h1>
        {
            myAppointments?
                    <ul>
                        {myAppointments.map((reserva) => (
                            <li key={reserva.id} >
                            <p>
                                <strong>Fecha:</strong>{" "}
                                {(reserva.fecha)}
                            </p>
                            <p>
                                <strong>Hora:</strong> {reserva.hora.substring(0, 5)}
                            </p>
                            {/* <p>
                                <strong>Estado:</strong> {reserva.estado}
                            </p> */}
                            {/* <p>
                                <strong>Taller:</strong> {reserva.taller_id}
                            </p> */}
                            </li>))}
                    </ul> : "Cargando"
        }
        
    </main>
  );
}