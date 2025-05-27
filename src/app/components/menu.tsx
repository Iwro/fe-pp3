"use client" 
import Link from 'next/link'
import { Button } from './button';
import styles from "./menu.module.css"

export function Menu() {
    return (
      <nav className={styles.nav}>
        <Button onClick={()=>{}}>Menu</Button>
        <Link href={"/sign-in"}>Ingresar</Link>
      </nav>
    );
  }
  