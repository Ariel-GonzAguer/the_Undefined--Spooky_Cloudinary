import { useEffect, useState } from "react";

// estilos
import styles from "./Retos.module.css";
import stylesAnimaciones from "../Intro/Intro.module.css";

// wouter
import { Link } from "wouter";

// componentes y hooks
import { toast, Toaster } from "sonner";
import useSpookyRisa from "../../customHooks/useSpookyRisa";

// imagenes
import gato1 from "/imgs/gato1.jpg";
import gato2 from "/imgs/gato2.jpg";
import midumichi from "/imgs/midumichi.jpg";
import gato3 from "/imgs/gato3.jpg";
import correcto from "/imgs/correcto.png";

// zustand
import useMonsterStore from "../Zustand/monsterStore";

export default function Reto1() {
  const [gato2ZombieState, setGato2ZombieState] = useState(false);
  const [rightAnswers, setRightAnswers] = useState([null, null, null]);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [allTrue, setAllTrue] = useState(false);

  // custom hook para el audio
  const playSpookyRisa = useSpookyRisa();

  // prompted img
  const { spookyImagesInStore } = useMonsterStore((state) => state);
  const promptedImg = spookyImagesInStore.prompted;

  // handles
  function handleRespuestaIncorrecta() {
    playSpookyRisa();
    setGato2ZombieState(true);
    setWrongAnswer(true);
    toast.error(`Has fallado. Refresca la página para volver a interlo`, {
      action: (
        <button
          style={{ width: "100px" }}
          onClick={() => window.location.reload()}
        >
          Refrescar
        </button>
      ),
    });
  }

  function handleRespuestasCorrectas(e) {
    const index = e.currentTarget.getAttribute("data-index");
    setRightAnswers((prev) => {
      const newRightAnswers = [...prev];
      newRightAnswers[index] = true;
      return newRightAnswers;
    });
    console.log("true", index); //BORRAR
  }

  useEffect(() => {
    if (rightAnswers.every((e) => e === true)) {
      setAllTrue(true);
    }
  }, [rightAnswers]);

  useEffect(() => {
    if (allTrue && !wrongAnswer) {
      toast.success("¡Felicidades! Has pasado al Reto II", {
        action: (
          <Link href="/Reto2">
            <button>Avanza al Reto II</button>
          </Link>
        ),
      });
    }
  }, [allTrue, wrongAnswer]);

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
      <section className={styles.Reto1}>
        <h2 className={styles.textoFantasma}>Reto I</h2>
        <h3>
          {" "}
          Michi === false ? "the_Undefined toma el mundo" : "El mundo aún puede
          salvarse"
        </h3>
        <p>
          Uno de estos felinos es un aliado de{" "}
          <span className={stylesAnimaciones.flicker}>the_Undefined</span>,
          disfrazado de michi.
        </p>
        <p>
          Tres gatitos dicen algo cierto, uno te dice algo falso ¿puedes
          descubrir quién es?
        </p>

        <p>
          Haz click sobre los gatitos que dicen la verdad para pasar al
          siguiente reto.
        </p>

        <p>
          {" "}
          Si haces click sobre el gatito que miente, verás al temible aliado y
          tendrás que volver a empezar.
        </p>

        <section className={styles.michisGrid}>
          <div
            className={styles.michi1}
            data-index="0"
            onClick={handleRespuestasCorrectas}
          >
            <img
              src={rightAnswers[0] === null ? gato1 : correcto}
              alt="lindo y tierno gato"
            />
            <p>console.log([].length {">"} 0);</p>
          </div>

          <div
            className={styles.michi2}
            data-index="3"
            onClick={handleRespuestaIncorrecta}
          >
            <img
              src={!gato2ZombieState ? gato2 : promptedImg} //ACÁ!!!!!!
              alt="linda y tierna gata"
            />
            <p>console.log("false" == false);</p>
          </div>

          <div
            className={styles.michi3}
            data-index="1"
            onClick={handleRespuestasCorrectas}
          >
            <img
              src={rightAnswers[1] === null ? gato3 : correcto}
              alt="un buen y lindo gato rojizo"
            />
            <p>console.log(typeof null === "object");</p>
          </div>

          <div
            className={styles.michi4}
            data-index="2"
            onClick={handleRespuestasCorrectas}
          >
            <img
              src={rightAnswers[2] === null ? midumichi : correcto}
              alt="el famoso Midumichi"
            />
            <p>console.log(typeof NaN === "number");</p>
          </div>
        </section>
      </section>
    </>
  );
}
