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
      toast(`Ahora puedes cerrar la ventana o refrescarla para volver.`, {
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
        <div className={styles.divH1}>
          <h1 className={styles.flicker}>the_Undefined</h1>
        </div>

        <p>
          Es 31 de octubre del 2024...
          <br />
          De entre las nubes, algo, un mostruo, una entidad desconocida, llamada{" "}
          <span className={`${styles.flickerDos}`}>the_Undefined</span>, ha llegado
          con terribles planes para el mundo de la programación.
          <br />
          Su objetivo principal es ser el resultado de todas las funciones a partir
          de ahora.
          <br />
          <br />
          ¡Noooooooo!
          <br />
          <br />
          Vence a los aliados de{" "}
          <span className={`${styles.blinkDos}`}>the_Undefined</span>,
          resolviendo tres retos relacionados con la programación para
          enfrentarte a él.
          <br />
          Derrota a <span className={`${styles.flickerCinco}`}>the_Undefined</span> y
          salva al mundo (de la programación), o huye ahora...
        </p>

        <section className={styles.buttonsContainer}>
          <Link href="/SeleccionarFotos">
            <button value="entrar" onClick={handleSeleccion}>
              Entrar
            </button>
          </Link>

          <button value="huir" onClick={handleSeleccion}>
            Huir
          </button>
        </section>
      </section>
    </>
  );
}
