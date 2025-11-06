"use client";
import {MapTalleres} from "./components/mapHome";
import styles from "./page.module.css";

export default function Home() {

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
