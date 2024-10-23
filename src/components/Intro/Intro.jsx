// estilos
import styles from "./Intro.module.css";

// componentes

// wouter
import { Link } from "wouter";

export default function Intro() {
  return (
    <>
      <section className={styles.Intro}>
        <div className={styles.divH1}>
          <h1 className={styles.flicker}>the_Undefined</h1>
        </div>

        <p>
          Es 31 de octubre del 2024...
          <br />
          De entre las nubes, una entidad inefable, ahora conocida como{" "}
          <span className={`${styles.flickerDos}`}>the_Undefined</span>, ha
          llegado con terribles planes para el mundo de la programación.
          <br />
          Su objetivo principal es ser el resultado de todas las funciones a
          partir de ahora.
          <br />
          <br />
          <span className={styles.nooo}>¡Noooooooo!</span>
          <br />
          <br />
          Vence a los terroríficos aliados de{" "}
          <span className={`${styles.flickerCien}`}>the_Undefined</span>,
          resolviendo tres retos relacionados con la Javascript, para
          enfrentarte al maligno ser.
          <br />
          Derrota a{" "}
          <span className={`${styles.flickerCinco}`}>the_Undefined</span> y
          salva al mundo, o huye ahora...
        </p>

        <section className={styles.buttonsContainer}>
          <Link href="/SeleccionarFotos">
            <button>Entrar</button>
          </Link>

          <Link href="/Huir">
            <button>Huir</button>
          </Link>
        </section>
      </section>
    </>
  );
}
