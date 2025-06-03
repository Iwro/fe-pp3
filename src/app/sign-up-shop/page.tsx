"use client"
import styles from "./sign-in-shop.module.css"
export default function SignUpShop() {
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>
          Registrar taller  
        </h1>
        <form onSubmit={()=>{}} className={styles.form}>
          <input type="text" name="nombre" placeholder="Nombre" className={styles.input} required />
          <input type="text" name="apellido" placeholder="Apellido" className={styles.input} required />
          <input type="email" name="email" placeholder="Email" className={styles.input} required />
          <input type="tel" name="telefono" placeholder="Teléfono" className={styles.input} required />
          <input type="password" name="password" placeholder="Contraseña" className={styles.input} required />
          <button type="submit" className={styles.button}>Registrar</button>
        </form>
      </main>
    );
  }