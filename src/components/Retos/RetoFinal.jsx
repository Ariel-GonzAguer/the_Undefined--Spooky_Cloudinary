import { useEffect, useState } from "react";

// estilos
import styles from "./Retos.module.css";
import stylesAnimaciones from "../Intro/Intro.module.css";

// componentes y hooks
import { Toaster, toast } from "sonner";
import useSpookyRisa from "../../customHooks/useSpookyRisa";

// wouter
import { Link } from "wouter";

// zustand
import useMonsterStore from "../Zustand/monsterStore";

export default function RetoFinal() {
  // estados para el juego
  const [bucleInfinito, setBucleInfinito] = useState(false);
  const [temporizador, setTemporizador] = useState(66);
  const [respuestas, setRespuestas] = useState({
    respuesta1: `696`,
    respuesta2: `696`,
  });

  // custom hook para la risa
  const playSpookyRisa = useSpookyRisa();

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
      playSpookyRisa();
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
            <button>Volver a jugar</button>
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

      <div
        className={bucleInfinito ? styles.demonioVisible : styles.none}
        // style={{
        //   position: "absolute",
        //   zIndex: "666",
        //   top: "5%",
        //   textAlign: "center",
        //   fontSize: "4rem",
        // }}
      >
        <img src={gato} alt="gato macabro" />
        {bucleInfinito &&
          toast.error("Bucle infinito activado. the_Undefined ha vencido...", {
            duration: 6666,
          })}
      </div>

      <section className={!bucleInfinito ? styles.RetoFinal : styles.none}>
        <h2 className={styles.textoFantasma}>Reto Final</h2>
        <div>
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
            {"}"};
          </h3>
        </div>

        <p>Felicidades, haz llegado al reto final.</p>
        <p>
          Este reto tiene doble propósito: salvar a las funciones del mundo y
          evitar que tu gato se convierta en un mostruo animal que se olvidará
          de ti ¡Se te acaba el tiempo!
        </p>
        <p>
          Cada código en esta página tiene la capacidad de crear un bucle
          infinito. Completa ambos códigos de forma correcta antes de que el
          temporizador llegue a 0. Solo hay una respuesta correcta para cada
          código.
        </p>
        <p>
          Si te equivocas y se acaba el tiempo,{" "}
          <span className={stylesAnimaciones.flickerDos}>the_Undefined</span>{" "}
          tomará al mundo, tu amigo gatuno no será el mismo, y será el fin de la
          programación.
        </p>

        <div className={styles.temporizadorYMichi}>
          <section className={styles.temporizador}>
            <p className={styles.heartbeat}>
              Te quedan <span>{temporizador}</span>
              <br /> segundos para salvar a tu michi
            </p>
          </section>
          <section className={styles.tuMichi}>
            <img
              src={gatoOriginal}
              alt="Gato"
              className={styles.gatoOriginal}
            />
          </section>
        </div>

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
              i--{"}"} <br />;
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
