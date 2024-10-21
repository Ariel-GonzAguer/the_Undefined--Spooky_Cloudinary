import { useEffect, useState } from "react";

// estilos
import styles from "./Retos.module.css";

// zustand
import useMonsterStore from "../Zustand/monsterStore";

// componentes
import { toast, Toaster } from "sonner";

// imagenes
import Luffy from "/imgs/Luffy2.png";

// wouter
import { Link } from "wouter";

export default function Reto2() {
  // esados para el reto
  const [turnoZombie, setTurnoZombie] = useState(false);
  const [posicionJugador, setPosicionJugador] = useState(3);
  const [posicionZombie, setPosicionZombie] = useState(0);
  const [pasosArray, setPasosArray] = useState(
    new Array(26).fill(<span></span>)
  );

  // zombie de zustand
  const { spookyImagesInStore } = useMonsterStore((state) => state);
  const zombie = spookyImagesInStore.zombie;

  // lógica del juego
  function getRandomNumber() {
    return Math.floor(Math.random() * 3) + 1;
  }

  function handleTurno() {
    if (!turnoZombie) {
      let nuevaPosicion = posicionJugador + getRandomNumber();
      setPosicionJugador(nuevaPosicion);
      console.log("jugador", nuevaPosicion); //BORRAR
      setTurnoZombie(true);
    } else {
      let nuevaPosicion = posicionZombie + getRandomNumber();
      setPosicionZombie(nuevaPosicion);
      console.log("zombie", nuevaPosicion); //BORRAR
      setTurnoZombie(false);
    }
  }

  useEffect(() => {
    const newPasosArray = new Array(26).fill("");
    newPasosArray[posicionJugador] = (
      <img src={Luffy} alt="" className={styles.miniZombie} />
    );
    newPasosArray[posicionZombie] = (
      <img src={zombie} alt="" className={styles.miniZombie} />
    );
    setPasosArray(newPasosArray);
  }, [posicionJugador, posicionZombie]);

  useEffect(() => {
    if (posicionJugador >= 26) {
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
    if (posicionZombie >= 26 || posicionZombie >= posicionJugador) {
      toast.error(
        "Se acabó... tu versión zombie te ha comido... Reinicia la página para volver a intentarlo",
        {
          duration: 6666,
        }
      );
    }
  }, [posicionZombie]);

  return (
    <>
      <Toaster
        position="bottom-center"
        closeButton
        visibleToasts={1}
        richColors
      />
      <section className={styles.Reto2}>
        <h2>Reto 2</h2>
        <h3> let suerte = Math.floor( Math.random( ) )</h3>
        <p>
          ¿Lograste descubrir al michi falso por suerte, o realmente sabías la
          respuesta?{" "}
        </p>

        <p>
          {" "}
          Si solo fue suerte, esperemos siga así, pues en este Reto la
          necesitarás, y el Midugato está en juego.
        </p>
        <p>
          Deberás salvar a Luffy de tu versión zombie, pero tus pasos son
          aleatorios, el camino está lleno de calabazas temblorosas y
          the_Undefined hace que el muerto viviente a veces sea más rápido que
          tú.
        </p>
        <p>
          Si no logras llegar al final del camino antes que tu versión
          terrorífica y zómbica, no hay futuro para la programación y
          the_Undefined tendrá al pequeño Luffy dentro de su scope. Tienes
          varios pasos de ventaja, pero ¿será eso suficiente?
        </p>

        <section className={styles.camino}>
          {pasosArray.map((paso, index) => (
            <div key={index} className={`${styles.paso} ${styles.vibrate}`}>
              {paso}
            </div>
          ))}
        </section>

        {posicionJugador > posicionZombie && (
          <button onClick={handleTurno}>
            {!turnoZombie ? "¡Corre por Luffy!" : "Mueve al zombie"}
          </button>
        )}
      </section>
    </>
  );
}
