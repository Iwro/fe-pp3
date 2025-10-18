"use client";
// import { promises as fs } from 'fs';
// import { Featured } from "./components/featured";
import {MapTalleres} from "./components/mapHome";
import styles from "./page.module.css";
// import { useEffect, useState } from "react";
// import { Mecanico } from "./utils/types";
// import { ShopData } from './interfaces/shopData';

export default function Home() {
  // const file = await fs.readFile(process.cwd() + '/src/app/public/mock.json', 'utf8');
  // const data = JSON.parse(file);
  // const [mecanicos, setMecanicos] = useState<Mecanico[]>([]);
  // const [cargando, setCargando] = useState(true);

  // useEffect(() => {
  //   fetch("http://localhost:3001/api/mecanicos")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMecanicos(data);
  //     })
  //     .finally(() => setCargando(false));
  // }, []);

  // console.log(mecanicos);

  return (
    <main className={styles.main}>
      {/* <Featured  /> */}
      <section className={styles.banner}>
        <h1 className={styles.title}>Encuentra tu taller de confianza</h1>
        <p className={styles.subtitle}>
          Nuestra plataforma conecta clientes con talleres mecánicos de tu zona.
          Registrá tu taller o buscá un mecánico cercano por barrio.
        </p>
      </section>
      <MapTalleres/>
    </main>
  );
}
