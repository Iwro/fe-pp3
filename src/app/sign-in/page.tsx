"use client"
import styles from "./sign-in.module.css"
export default function SignIn() {
    return (
      <main className={styles.main}>
      <h1 className={styles.title}>
        Iniciar sesión  
      </h1>
      <form onSubmit={()=>{}} className={styles.form}>
        <input type="email" name="email" placeholder="Email" className={styles.input} required />
        <input type="password" name="password" placeholder="Contraseña" className={styles.input} required />
        <button type="submit" className={styles.button}>Registrar</button>
      </form>
    </main>
    );
  }