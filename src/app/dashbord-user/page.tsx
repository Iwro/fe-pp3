"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "../utils/api";
import styles from "./dashbord-user.module.css";
import { ShopData, User } from "../utils/types";
import MapTallerEditable from "../components/mapEditable";
import { toast } from "react-toastify";

export default function DashbordUser() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<User>();
  const [shopData, setShopData] = useState<ShopData>()
  const [barrios, setBarrios] = useState<{ id: number; nombre: string }[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [horarioInicio, setHorarioInicio] = useState("09:00");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [horarioFin, setHorarioFin] = useState("18:00");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [duracion, setDuracion] = useState(60);
  const [dias, setDias] = useState(["lun", "mar", "mie", "jue", "vie", "sab", "dom"]);
  // const [ubicacion, setUbicacion] = useState<{ lat: number; lng: number } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ubicacion, setUbicacion] = useState<{ latitud: number; longitud: number } | null>(
    // {
    // latitud: shopData?.latitud,
    // longitud: shopData?.longitud,
  // }
);
    useEffect(() => {
    const fetchBarrios = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/barrios");
        const data = await res.json();
        
        setBarrios(data.data);
      } catch (error) {
        console.error("Error cargando barrios", error);
      }
    };
    fetchBarrios();
  }, []);
  useEffect(() => {
    console.log(shopData);
    setUbicacion({latitud: shopForm?.latitud, longitud:shopForm?.longitud})
    return () => {
      
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopData]);
  useEffect(() => {
    console.log(usuario);
    console.log(usuario?.rol_id == 2);
    if (usuario?.rol_id == 2) {
      fetchWithAuth("http://localhost:3001/api/profile/shop").then(async (res) => {
        const data = await res.json();
        setShopData(data?.data[0])
        // setShopForm(data?.data[0])
        // handleUbicacionSeleccionada(data?.data[0]?.latitud, data?.data[0]?.longitud)
      })
    }
    return () => {
      
    };
  }, [usuario]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });
  const [shopForm, setShopForm] = useState({
    barrio_id: 0,
    ciudad: "",
    creado_en: "",
    dias_laborales: [""],
    direccion: "",
    duracion_turno: 0,
    horario_fin: "",
    horario_inicio: "",
    id: 0,
    latitud: 0,
    longitud: 0,
    nombre_taller: "",
    usuario_id: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
    
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/sign-in");
    
    fetchWithAuth("http://localhost:3001/api/profile").then(async (res) => {
      if (!res.ok) {
        router.push("/sign-in");
      } else {
        const data = await res.json();
        
        console.log("HOLA", data.data[0]);
        setUsuario(data.data[0]);
        setForm(data.data[0])
        // setUserValue(data.data[0])
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
        try {
          const res = await fetch(`http://localhost:3001/api/${shopData?.usuario_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          });
    
          const data = await res.json();
    
          if (data.error) {
            toast.error("Error al actualizar usuario taller");
          } else {
            toast.success("Datos actualizados correctamente");
          }} catch (e) {console.log(e);
          }
  };

  const handleShopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

        try {
          const res = await fetch("http://localhost:3001/api/usuario/shop", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(shopForm),
          });
    
          const data = await res.json();
    
          if (data.error) {
            toast.error("Error al actualizar usuario taller");
          } else {
            toast.success("Datos actualizados correctamente");
          }} catch (e) {console.log(e);
          }
  };

  const handleUbicacionChange = (lat: number, lng: number) => {
    setUbicacion({ latitud: lat, longitud: lng });
  };
  // const handleUbicacionSeleccionada = (lat: number, lng: number) => {
  //   // setUbicacion({ lat: shopForm.latitud, lng: shopForm.longitud });
  //   // setUbicacion({ lat: lat, lng: lng });
  //   setShopForm({ ...shopForm, latitud: shopForm.latitud, longitud: shopForm.longitud});
  //   console.log({lat,lng});
  //   console.log("MAPAA",shopForm);
    
  // };

    const handleChangeShop = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShopForm({ ...shopForm, [e.target.name]: e.target.value });
  };

  if (!usuario) return <p>Cargando...</p>;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Mis datos</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Datos de usuario: </h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          className={styles.input}
          required
          onChange={handleChange}
          value={form?.nombre}
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          className={styles.input}
          required
          onChange={handleChange}
          value={form?.apellido}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
          required
          onChange={handleChange}
          value={form?.email}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          className={styles.input}
          required
          onChange={handleChange}
          value={form?.telefono}
        />
        {/* <input type="password" name="contraseña" placeholder="Contraseña" className={styles.input} onChange={handleChange} required /> */}
        <button type="submit" className={styles.button}>
          Modificar
        </button>
      </form>

      {usuario.rol_id == 2?
        (
    <main className={styles.main}>
      <h1 className={styles.title}>Datos taller</h1>
      <form onSubmit={handleShopSubmit} className={styles.form}>
        <input
          type="text"
          name="nombre_taller"
          placeholder="Nombre taller"
          className={styles.input}
          required
          value={shopData?.nombre_taller}
          onChange={handleChangeShop}
        />
        <label>
          Barrio:
          <select
            name="barrio_id"
            className={styles.input}
            value={shopData?.barrio_id}
            required
            onChange={(e) =>
              setShopForm({ ...shopForm, barrio_id: Number(e.target.value) })
            }
          >
            <option value="">Seleccione un barrio</option>
            {barrios?.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nombre}
              </option>
            ))}
          </select>
        </label>
        <input
          type="text"
          name="direccion"
          placeholder="Direccion"
          className={styles.input}
          required
          value={shopData?.direccion}
          onChange={handleChangeShop}
        />
        <label>
          Inicio:{" "}
          <input
            type="time"
            value={shopData?.horario_inicio}
            step={1800}
            onChange={(e) => setHorarioInicio(e.target.value)}
          />
        </label>
        <label>
          Fin:{" "}
          <input
            type="time"
            value={shopData?.horario_fin}
            step={1800}
            onChange={(e) => setHorarioFin(e.target.value)}
          />
        </label>
        <label>
          Duración:
          <select
            value={shopData?.duracion_turno}
            onChange={(e) => setDuracion(Number(e.target.value))}
          >
            {/* <option value={30}>30 min</option> */}
            <option value={60}>1 hora</option>
            {/* <option value={90}>1h 30m</option> */}
          </select>
        </label>
        <div>
          {dias.map((d) => (
            <label key={d}>
              <input
                type="checkbox"
                checked={shopData?.dias_laborales.includes(d)}
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
        <h3>Seleccioná tu ubicación</h3>
        {shopData?.latitud?
          <MapTallerEditable
        latitudInicial={shopData?.latitud as number}
        longitudInicial={shopData?.longitud as number}
        onChangeUbicacion={handleUbicacionChange}
       /> : ""
}
        {shopData && (""
          // <p>
          //   📍 Ubicación seleccionada: {shopData?.latitud.toFixed(4)}, {shopData?.longitud.toFixed(4)}
          // </p>
        )}
        <button type="submit" className={styles.button}>
          Modificar
        </button>
      </form>
    </main>
  ) 
    : ""  
    }
    </main>
  );
}
