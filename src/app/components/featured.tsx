"use client"
import { useRouter } from 'next/navigation'
// import { Mecanico } from "../utils/types";
import { Button } from "./button";
import styles from "./featured.module.css"
import { useEffect, useState } from 'react';

type Barrio  = {
    id: number,
    nombre: string
}

// type FeaturedProps = {
//     data: Mecanico[];
//   };
export function Featured () {
    const router = useRouter()
    const [barrios, setBarrios] = useState<Barrio[]>([]);
    const [talleres, setTalleres] = useState<{"id": number,
        "nombre_taller": string,
        "direccion": string,
        "creado_en": string,
        "horario_inicio": string,
        "horario_fin": string,
        "duracion_turno": number,
        "dias_laborales": string[],
        "usuario_id": number,
        "ciudad": string,
        "barrio_id": {nombre:string}}[]>([]);
    const [barrioSeleccionado, setBarrioSeleccionado] = useState("");

  useEffect(() => {
    const fetchBarrios = async()=>{
        const barrios =   await  fetch("http://localhost:3001/api/barrios").then((res) => res.json())
        setBarrios(barrios.data)

    } 

    fetchBarrios()
    
    // fetch("http://localhost:3001/api/barrios")
    //   .then((res) => res.json())
    //   .then(setBarrios);
  }, []);

  
  const filtrarTalleres = async () => {
    const url = barrioSeleccionado
      ? `http://localhost:3001/api/mecanicos/barrio/${parseInt(barrioSeleccionado)}`
      : `http://localhost:3001/api/talleres`;

    const res = await fetch(url);
    const talleres = await res.json();

    if (talleres.data) {
      setTalleres(talleres.data)
    } else {
      setTalleres(talleres);
    }
    console.log(talleres);
    
  };

    const handleReservation = (id: number) => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            return router.push("/sign-in");
        }
        else {
            router.push("/mechanic/" + id )       
        }
    };
    
    return <div className={styles.by_map}>
      <h2>Filtrar talleres por barrio</h2>
      <select
        value={barrioSeleccionado}
        onChange={(e) => setBarrioSeleccionado(e.target.value)}
      >
        <option value="">Todos</option>
        {barrios.map((barrio) => (
          <option key={barrio.id} value={barrio.id}>
            {barrio.nombre}
          </option>
        ))}
      </select>
      <button onClick={filtrarTalleres} className={styles.search_button}>Buscar</button>

      <ul>
        {talleres.map((item) => (
                    <li key={item.id} className={styles.li}>
                        <h3>
                            {item.nombre_taller}
                        </h3>
                        <h4>
                            Barrio: 
                              {item.barrio_id?.nombre}
                        </h4>
                        <h5>
                            Dirección: {item.direccion}
                        </h5>
                        <Button className={styles.button} onClick={()=> {handleReservation(item.id)}}>Reservar</Button>
                    </li>
        ))}
      </ul>
    </div>
    // return <div className={styles.container}>
    //         <h1>
    //             Destacados
    //         </h1>
    //         <ul className={styles.cardContainer}>
    //             {data.map((item) => (
    //                 <li key={item.id} className={styles.li}>
    //                     <h3>
    //                         {item.nombre_taller}
    //                     </h3>
    //                     {/* <h4>
    //                         Ubicación: {item.barrio}
    //                     </h4> */}
    //                     <h5>
    //                         Dirección: {item.direccion}
    //                     </h5>
    //                     <Button className={styles.button} onClick={()=> {handleReservation(item.id)}}>Reservar</Button>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>  
}