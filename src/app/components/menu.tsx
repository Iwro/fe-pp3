"use client";
import Link from 'next/link'
import React, { useState } from "react";
import styles from "./menu.module.css";

export function Menu() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className={styles.nav}>
      {/* <Button className={styles.button} onClick={() => {}}>
        Menu
      </Button> */}
      {/* <Button className={styles.button} onClick={() => {}}> */}
        <li className={styles.li + " " + styles.headMenu} onClick={handleClick}>
        {openMenu ? "Cerrar" : "Ingresar"}
        </li>
      {/* </Button> */}
      <ul className={openMenu ? styles.opened : styles.closed}>
        <li className={styles.li}>
          <Link href="/sign-in" className={styles.link}>Iniciar sesión</Link>
          {/* <Button className={styles.button} onClick={() => {}}>
            Iniciar sesión
          </Button> */}
        </li>
        <li className={styles.li}>
          <Link href="/sign-up-user" className={styles.link}>Registrar usuario</Link>
          {/* <Button className={styles.button} onClick={() => {}}>
            Registrar usuario
          </Button> */}
        </li>
        <li className={styles.li}>
        <Link href="/sign-up-shop" className={styles.link}>Registrar taller</Link>

          {/* <Button className={styles.button} onClick={() => {}}>
            Registrar taller
          </Button> */}
        </li>
      </ul>
      {/* <Link href={"/sign-in"}>Ingresar</Link> */}
    </nav>
  );
}
