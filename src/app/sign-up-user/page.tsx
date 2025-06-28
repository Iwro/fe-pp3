"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import styles from "./sign-in-user.module.css"

export default function SignUpUser() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    contraseña: '',
    rol_id: 1
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);
      
      if (data.error) {
        toast.error('Error al registrar usuario');
      } else {
        toast.success('Usuario creado correctamente');

        setTimeout(() => {
          router.push('/sign-in');
        }, 2000);
      }
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message || 'Error al crear el usuario');
    }; }

    return (
      <main className={styles.main}>
        <h1 className={styles.title}>
          Registrar usuario  
        </h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="nombre" placeholder="Nombre" className={styles.input} required onChange={handleChange} />
        <input type="text" name="apellido" placeholder="Apellido" className={styles.input} required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" className={styles.input} required onChange={handleChange} />
        <input type="tel" name="telefono" placeholder="Teléfono" className={styles.input} required onChange={handleChange} />
        <input type="password" name="contraseña" placeholder="Contraseña" className={styles.input} onChange={handleChange} required />
        <button type="submit" className={styles.button}>Registrar</button>
      </form>
      
      </main>

    );
  }