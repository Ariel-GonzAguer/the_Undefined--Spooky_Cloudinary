import { useState } from "react";

import styles from "./Intro.module.css";

import { toast, Toaster } from "sonner";
import { Link } from "wouter";

export default function Intro() {
  const [seleccion, setSeleccion] = useState(null);

  function handleSeleccion(e) {
    const value = e.target.value;
    setSeleccion(value);

    if (value === "entrar") {
      console.log("seleccion ->", seleccion); // BORRAR AL FINAL
    } else if (value === "huir") {
      toast(`Ahora pueded cerrar la ventana o refrescarla para volver.`, {
        duration: 6666,
      });
    }
  }

  return (
    <>
      <Toaster position="bottom-center" closeButton visibleToasts={1} />
      <section
        className={`${
          seleccion === null || seleccion === "entrar"
            ? styles.Intro
            : seleccion === "huir"
            ? styles.none
            : " "
        }`}
      >
        <h1>the_Undefined</h1>
        <p>
          Acepta el reto de derrotar a the_Undefined y salva al mundo (de la
          programación) o huye ahora...
        </p>

        <Link href="/SeleccionarFotos">
          <button value="entrar" onClick={handleSeleccion}>
            Entrar
          </button>
        </Link>

        <button value="huir" onClick={handleSeleccion}>
          Huir
        </button>
      </section>
    </>
  );
}
