
'use client'
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { DatePicker } from "@/app/components/daypicker";
import { useParams } from 'next/navigation';
import { dateAtom, userAtom } from "@/app/components/atoms/atoms";
import { useAtom } from "jotai";
import { Button } from "@/app/components/button";
import { fetchWithAuth } from "@/app/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Mechanic() {
  const router = useRouter();
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userValue, setUserData] = useAtom(userAtom)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dateInfo, setDateInfo] = useAtom(dateAtom)
  const [hourSelected, setHourSelected] = useState<string>()
  const [horariosDisponibles, setHorariosDisponibles] = useState<string[]>([]);
  const { id } = params;  
    
  const formatDate = (date:Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed

    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>)=>{
    const selectedValue = event.target.value;
    if (!selectedValue) {
      return
    } else {
      setHourSelected(selectedValue)

    }
}

  const handleSendReservation = async ()=>{
    if (!hourSelected) {     
      return
    }
    try {
    const token = localStorage.getItem("token"); // el que guardaste al hacer login
    if (!token) {
      toast.error("Debes iniciar sesión")
      return;
    }
    const formatedDate = formatDate(dateInfo as Date)
    const compareDate = new Date()
    if (dateInfo?dateInfo<compareDate:"") {
      toast.error("La fecha no es válida.")
      console.log("la fecha no es correcta")
      return
     }
    const response = await fetchWithAuth(
      `http://localhost:3001/api/turnos/${id}`,
      {
        method: "POST",
        body: JSON.stringify({
          fecha: formatedDate,  // YYYY-MM-DD
          hora: hourSelected,   // HH:mm
        }),
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = await response.json();

    if (!response.ok) {
      toast.error("Hubo un error")
      return;
    }

    toast.success(`Reserva creada exitosamente`);

    setTimeout(() => {
      router.push("/mis-reservas");
    }, 2000);

  } catch (error) {
    console.error("Error en la reserva:", error);
    toast.error("Hubo un error")
  }
  } 

  useEffect(() => {
    const fetchHorario = async () => {
      try {
        if (dateInfo) {
          const formatedDate = formatDate(dateInfo)
          const res = await fetch(`http://localhost:3001/api/mecanicos/turnos/${id}/${formatedDate}`)
          const data = await res.json()
          setHorariosDisponibles(data);   
          console.log("HORARIOS DISPONIBLES", horariosDisponibles) 
        }
      } catch (error) {
        console.log("Error: ", error)
      }
    }
    fetchHorario()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateInfo, id]);

    return (
        <main className={styles.main}>
          <DatePicker />
          {
            dateInfo?
            <div>{"Fecha seleccionada: "+ dateInfo?.toLocaleDateString()}</div>:
            <div>{"Fecha seleccionada: seleccione una fecha"}</div>
          }
          <div>
                <label htmlFor="horarios">Selecciona un horario disponible:</label>
                <select   
                  id="horarios" 
                  value={dateInfo?.toLocaleDateString()} 
                  onChange={handleHourChange}>
                  <option value="">-- Elige un horario --</option>
                  {horariosDisponibles?.map((horario, index) => (
                    <option key={index} value={horario}>
                      {horario.slice(0, 5)}  
                    </option>
                  ))}
                </select>
                <Button onClick={handleSendReservation} className={""}>Seleccionar horario</Button>
              </div>
        </main>
      );
}
