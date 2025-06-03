import Image from "next/image";
import { Menu } from "./menu";
import styles from "./header.module.css"
import Link from "next/link";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={100} height={50}></Image>
      </Link>
      
      <Menu/>
    </header>
  );
}
