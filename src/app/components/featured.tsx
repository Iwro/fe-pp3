"use client"
import { Mecanico } from "../utils/types";
import { Button } from "./button";
import styles from "./featured.module.css"


type FeaturedProps = {
    data: Mecanico[];
  };
export function Featured ({data}: FeaturedProps) {
    return <div className={styles.container}>
            <h1>
                Destacados
            </h1>
            <ul className={styles.cardContainer}>
                {data.map((item) => (
                    <li key={item.id} className={styles.li}>
                        <h3>
                            {item.nombre_taller}
                        </h3>
                        {/* <h4>
                            Ubicación: {item.barrio}
                        </h4> */}
                        <h5>
                            Dirección: {item.direccion}
                        </h5>
                        <Button className={styles.button} onClick={()=> {}}>Reservar</Button>
                    </li>
                ))}
            </ul>
        </div>  
}