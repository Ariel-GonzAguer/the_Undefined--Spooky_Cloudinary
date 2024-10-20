import { useEffect, useState } from "react";

// estilos
import styles from "./Retos.module.css";

// componentes
import { Toaster, toast } from "sonner";

// wouter
import { Link } from "wouter";

// zustand
import useMonsterStore from "../Zustand/monsterStore";

export default function RetoFinal() {
  // estados para el juego
  const [bucleInfinito, setBucleInfinito] = useState(false);
  const [temporizador, setTemporizador] = useState(66);
  const [respuestas, setRespuestas] = useState({
    respuesta1: `completar`,
    respuesta2: `completar`,
  });

  // zustand
  const { spookyImagesInStore } = useMonsterStore((state) => state);
  const gato = spookyImagesInStore.gato;
  const gatoOriginal = spookyImagesInStore.gatoOriginal;

  useEffect(() => {
    if (temporizador <= 0) {
      setBucleInfinito(true);
    }
  }, [temporizador]);

  // handles
  function handleInputChange(e) {
    const { name, value } = e.target;
    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      [name]: value,
    }));
  }

  function handleJuegoPerdido() {
    if (bucleInfinito === true) {
      toast.error(
        "Dile adiós a tu michi...o reinicia la página y vuelve a intentarlo",
        {
          action: (
            <button
              onClick={() => window.location.reload()}
              style={{ width: "100px" }}
            >
              Reiniciar
            </button>
          ),
          duration: 6666,
        }
      );
    }
  }

  function handleJuegoGanado() {
    if (
      bucleInfinito === false &&
      respuestas.respuesta1 === ">" &&
      respuestas.respuesta2 === "false"
    ) {
      toast.success("¡Has salvado al mundo y a tu michi!", {
        action: (
          <Link href="/">
            <button>Vuelve al inicio</button>
          </Link>
        ),
        duration: 6666,
      });
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTemporizador((prevTemporizador) => prevTemporizador - 1);
    }, 1000);

    if (respuestas.respuesta1 === ">" && respuestas.respuesta2 === "false") {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [respuestas.respuesta1, respuestas.respuesta2]);

  useEffect(() => {
    bucleInfinito && handleJuegoPerdido();
  }, [bucleInfinito]);

  useEffect(() => {
    !bucleInfinito && handleJuegoGanado();
  }, [bucleInfinito, respuestas.respuesta1, respuestas.respuesta2]);

  return (
    <>
      <Toaster
        position="bottom-center"
        closeButton
        visibleToasts={1}
        richColors
      />

      <div className={bucleInfinito ? styles.demonioVisible : styles.none}>
        <img src={gato} alt="gato macabro" />
      </div>
      <div
        className={bucleInfinito ? styles.demonioVisible : styles.none}
        style={{
          position: "absolute",
          zIndex: "666",
          top: "5%",
          textAlign: "center",
          fontSize: "4rem",
        }}
      >
        <p>the_Undefined ha ganado...</p>
      </div>

      <section className={!bucleInfinito ? styles.RetoFinal : styles.none}>
        <h2>Reto Final</h2>
        <h3>
          if (bucleInfinito === true) {"{"} <br />
          <span>&nbsp;&nbsp;</span>let michi = "versión macabra";
          <br />
          <span>&nbsp;&nbsp;&nbsp;</span>return the_Undefined;
          <br />
          <span>&nbsp;&nbsp;</span>
          {"}"} else {"{"}
          <br />
          <span>&nbsp;&nbsp;&nbsp;</span>return "¡Haz salvado al mundo!";
          <br />
          <span>&nbsp;&nbsp;</span>
          {"}"}
          <br />
          {"}"}
        </h3>
        <section className={styles.temporizador}>
          <p>Te quedan: {temporizador} segundos para salvar a tu michi 😱</p>
        </section>

        <p>Felicidades, haz llegado al reto final.</p>
        <p>
          Este reto tiene doble propósito: salvar al mundo y evitar que
          the_Undefined convierta a tu gato en un mostruo animal que se olvidará
          de ti 😔 ¡y se te acaba el tiempo!
        </p>
        <p>
          Los códigos en esta página tienen los elementos necesarios para crear
          un bucle infinito. Completa ambos códigos de forma correcta antes de
          que el temporizador llegue a 0.
        </p>
        <p>
          Si te equivocas, the_Undefined tomará al mundo, tu amigo gatuno no
          será el mismo, y será el fin de la programación.
        </p>

        <p>
          Acá está tu gatito para recordarte que no tienes tiempo que perder
        </p>
        <img src={gatoOriginal} alt="Gato" />

        <section className={styles.bucles}>
          <section className={styles.bucle1}>
            <p className={styles.codigoACorregir}>
              let cl = 0; <br />
              while (cl{" "}
              <span className={styles.completar}>{respuestas.respuesta1} </span>
              999) {"{"}
              <br />
              <span>&nbsp;&nbsp;&nbsp;</span>alert (cl);
              <br />
              <span>&nbsp;&nbsp;&nbsp;</span>
              i--;
              <br />
              {"}"}
            </p>
            <label>
              Respuesta 1:
              <input
                type="text"
                name="respuesta1"
                value={respuestas.respuesta1}
                onChange={handleInputChange}
                placeholder="Ingrese un valor"
              />
            </label>
          </section>

          <section className={styles.bucle2}>
            <p className={styles.codigoACorregir}>
              let cl = 696; <br />
              do {"{"}
              <br />
              console.log(cl, 'the_Undefined vencerá');
              <br />
              {"}"} while (
              <span className={styles.completar}>{respuestas.respuesta2}</span>
              );
            </p>
            <label>
              Respuesta 2:
              <input
                type="text"
                name="respuesta2"
                value={respuestas.respuesta2}
                onChange={handleInputChange}
                placeholder="Ingrese un valor"
              />
            </label>
          </section>
        </section>
      </section>
    </>
  );
}
