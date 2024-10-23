import { useEffect, useState } from "react";

// estilos
import styles from "./Retos.module.css";
import stylesAnimaciones from "../Intro/Intro.module.css";

// zustand
import useMonsterStore from "../Zustand/monsterStore";

// componentes y hooks
import { toast, Toaster } from "sonner";
import useSpookyRisa from "../../customHooks/useSpookyRisa";

// imagenes
import Luffy from "/imgs/Luffy2.png";

// wouter
import { Link } from "wouter";

export default function Reto2() {
  // esados para el reto
  const [posicionJugador, setPosicionJugador] = useState(3);
  const [posicionZombie, setPosicionZombie] = useState(0);
  const [pasosArray, setPasosArray] = useState(
    new Array(26).fill(<span></span>)
  );

  // custom hook para el audio
  const playSpookyRisa = useSpookyRisa();

  // zombie de zustand
  const { spookyImagesInStore } = useMonsterStore((state) => state);
  const zombie = spookyImagesInStore.zombie;

  // lógica del juego
  function getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1;
  }

  function moverJugador() {
    let nuevaPosicion = posicionJugador + getRandomNumber();
    setPosicionJugador(nuevaPosicion);
    console.log("jugador", nuevaPosicion); //BORRAR
  }

  function moverZombie() {
    let nuevaPosicion = posicionZombie + getRandomNumber();
    setPosicionZombie(nuevaPosicion);

    console.log("zombie", nuevaPosicion); //BORRAR
  }

  function handleTurno() {
    moverJugador();
    setTimeout(() => {
      moverZombie();
    }, 100); // Retraso de 1 segundo antes de mover al zombie
  }

  useEffect(() => {
    const newPasosArray = new Array(23).fill("");
    newPasosArray[posicionJugador] = (
      <img
        src={Luffy}
        alt=""
        className={styles.miniZombie}
        onClick={handleTurno}
      />
    );
    newPasosArray[posicionZombie] = (
      <img src={zombie} alt="" className={styles.miniZombie} />
    );
    setPasosArray(newPasosArray);
  }, [posicionJugador, posicionZombie]);

  useEffect(() => {
    if (posicionJugador >= 23) {
      toast.success(
        "¡Lograsta huir de tu versión zombie! ¡El mundo aún tiene esperanza! Avanza al Reto III",
        {
          action: (
            <Link href="/Reto3">
              <button>Avanza al Reto III</button>
            </Link>
          ),
          duration: 6666,
        }
      );
    }
  }, [posicionJugador]);

  useEffect(() => {
    if (posicionZombie >= posicionJugador) {
      playSpookyRisa();
      toast.error(
        "Se acabó... tu versión zombie te ha comido... Reinicia la página para volver a intentarlo",
        {
          action: (
            <button
              style={{ width: "100px" }}
              onClick={() => window.location.reload()}
            >
              Refrescar
            </button>
          ),
        }
      );
    }
  }, [posicionZombie]);

  // efecto para que la ventana se desplace al inicio al cargar el componente en dispositivos móviles
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Toaster
        position="bottom-center"
        closeButton
        visibleToasts={1}
        richColors
      />
      <section className={styles.Reto2}>
        <h2 className={styles.textoFantasma}>Reto 2</h2>
        <h3> let suerte = Math.floor( Math.random( ) )</h3>
        <p>
          ¿Lograste descubrir al michi falso por suerte, o realmente sabías la
          respuesta?{" "}
        </p>
        <p>
          En este Reto necesitas suerte pues deberás salvar a Luffy de tu
          versión zombie, pero tus pasos son aleatorios, el camino está lleno de
          calabazas temblorosas y el muerto viviente a veces es más rápido que
          tú.
        </p>
        <p>
          Si no logras llegar al final del camino antes que tu versión zómbica,
          no hay futuro para la programación y{" "}
          <span className={stylesAnimaciones.flicker}>the_Undefined</span>{" "}
          tendrá al pequeño Luffy dentro de su scope. Tienes varios pasos de
          ventaja, pero ¿será eso suficiente?
        </p>

        <section className={styles.camino}>
          {pasosArray.map((paso, index) => (
            <div key={index} className={`${styles.paso} ${styles.vibrate}`}>
              {paso}
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
