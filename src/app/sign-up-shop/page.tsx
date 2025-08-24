"use client";
import { useRouter } from "next/navigation";
import styles from "./sign-in-shop.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
export default function SignUpShop() {
  const router = useRouter();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    contrasena: "",
    rol_id: 2,
  });

  const [dias, setDias] = useState(["lun", "mar", "mie", "jue", "vie"]);
  const [duracion, setDuracion] = useState(60);
  const [horarioInicio, setHorarioInicio] = useState("09:00");
  const [horarioFin, setHorarioFin] = useState("18:00");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/usuario/shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (data.error) {
        toast.error("Error al registrar usuario");
      } else {
        toast.success("Usuario creado correctamente");

        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error.message || "Error al crear el usuario");
    }
  };
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Registrar taller</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className={styles.input}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          className={styles.input}
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
          required
          onChange={handleChange}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          className={styles.input}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="contrasena"
          placeholder="Contrasena"
          className={styles.input}
          required
          onChange={handleChange}
        />

        <input
          type="text"
          name="nombre_taller"
          placeholder="Nombre taller"
          className={styles.input}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="barrio"
          placeholder="Barrio"
          className={styles.input}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Direccion"
          className={styles.input}
          required
          onChange={handleChange}
        />
        <label>
          Inicio:{" "}
          <input
            type="time"
            value={horarioInicio}
            step={1800}
            onChange={(e) => setHorarioInicio(e.target.value)}
          />
        </label>
        <label>
          Fin:{" "}
          <input
            type="time"
            value={horarioFin}
            step={1800}
            onChange={(e) => setHorarioFin(e.target.value)}
          />
        </label>
        <label>
          Duración:
          <select
            value={duracion}
            onChange={(e) => setDuracion(Number(e.target.value))}
          >
            <option value={30}>30 min</option>
            <option value={60}>1 hora</option>
            <option value={90}>1h 30m</option>
          </select>
        </label>
        <div>
          {["lun", "mar", "mie", "jue", "vie", "sab"].map((d) => (
            <label key={d}>
              <input
                type="checkbox"
                checked={dias.includes(d)}
                onChange={() =>
                  setDias((prev) =>
                    prev.includes(d)
                      ? prev.filter((x) => x !== d)
                      : [...prev, d]
                  )
                }
              />
              {d.toUpperCase()}
            </label>
          ))}
        </div>
        <button type="submit" className={styles.button}>
          Registrar
        </button>
      </form>
    </main>
  );
}
