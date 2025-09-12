"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "../utils/api";
import styles from "./dashbord-user.module.css";
import { User } from "../utils/types";
import {userAtom} from "../components/atoms/atoms";
import { useAtom } from "jotai";

export default function DashbordUser() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<User>();
  const [userValue, setUserValue] = useAtom(userAtom);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    fetchWithAuth("http://localhost:3001/api/profile").then(async (res) => {
      if (!res.ok) {
        router.push("/sign-in");
      } else {
        const data = await res.json();

        setUsuario(data.data[0]);
        setUserValue(data.data[0])
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Mis datos</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className={styles.input}
          required
          onChange={handleChange}
          value={userValue?.nombre}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          className={styles.input}
          required
          onChange={handleChange}
          value={userValue?.apellido}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
          required
          onChange={handleChange}
          value={userValue?.email}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          className={styles.input}
          required
          onChange={handleChange}
          value={userValue?.telefono}
        />
        {/* <input type="password" name="contraseña" placeholder="Contraseña" className={styles.input} onChange={handleChange} required /> */}
        <button type="submit" className={styles.button}>
          Modificar
        </button>
      </form>
    </main>
  );
}
