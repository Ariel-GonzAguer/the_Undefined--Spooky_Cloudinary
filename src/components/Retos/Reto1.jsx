import { useEffect, useState } from "react";

// estilos
import styles from "./Retos.module.css";

// wouter
import { Link } from "wouter";

// componentes
import { toast, Toaster } from "sonner";

// imagenes
import gato1 from "/imgs/gato1.jpg";
import gato2 from "/imgs/gato2.jpg";
import gato2Malo from "/imgs/gato2Malo.png";
import midumichi from "/imgs/midumichi.jpg";
import gato3 from "/imgs/gato3.jpg";
import correcto from "/imgs/correcto.png";

export default function Reto1() {
  const [gato2ZombieState, setGato2ZombieState] = useState(false);
  const [rightAnswers, setRightAnswers] = useState([null, null, null]);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [allTrue, setAllTrue] = useState(false);

  function handleConvertToZombie() {
    setGato2ZombieState(true);
    setWrongAnswer(true);
    toast(`Has fallado. Refresca la página para volver a interlo`, {
      duration: 6666,
    });
  }

  function handleAllCool(e) {
    const index = e.currentTarget.getAttribute("data-index");
    setRightAnswers((prev) => {
      const newRightAnswers = [...prev];
      newRightAnswers[index] = true;
      return newRightAnswers;
    });
    console.log("true", index);
  }

  useEffect(() => {
    if (rightAnswers.every((e) => e === true)) {
      setAllTrue(true);
    }
  }, [rightAnswers]);

  return (
    <>
      <Toaster position="bottom-center" closeButton visibleToasts={1} />
      <section className={styles.Reto1}>
        <h2>Reto I:</h2>
        <h3>
          {" "}
          Michi === false ? "the_Undefined toma el mundo" : "El mundo aún puede
          salvarse"
        </h3>
        <p>
          Aunque no parezca, uno de estos felinos es aliado de the_Undefined 😱
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
          Si haces click sobre el gatito que miente, tendrás que volver a
          empezar 👿
        </p>

        <section className={styles.michisGrid}>
          <div className={styles.michi1} data-index="0" onClick={handleAllCool}>
            <img
              src={rightAnswers[0] === null ? gato1 : correcto}
              alt="lindo y tierno gato"
            />
            <p>console.log(typeof ([] + []) === "string");</p>
          </div>

          <div
            className={styles.michi2}
            data-index="3"
            onClick={handleConvertToZombie}
          >
            <img
              src={!gato2ZombieState ? gato2 : gato2Malo}
              alt="linda y tierna gata"
            />
            <p>console.log("false" == false);</p>
          </div>

          <div className={styles.michi3} data-index="1" onClick={handleAllCool}>
            <img
              src={rightAnswers[1] === null ? gato3 : correcto}
              alt="un buen y lindo gato rojizo"
            />
            <p>console.log(typeof null === "object");</p>
          </div>

          <div className={styles.michi4} data-index="2" onClick={handleAllCool}>
            <img
              src={rightAnswers[2] === null ? midumichi : correcto}
              alt="el famoso Midumichi"
            />
            <p>console.log(typeof NaN === "number");</p>
          </div>
        </section>

        {allTrue && !wrongAnswer && (
          <Link href="/Reto2">
            <button>Avanza al Reto II</button>
          </Link>
        )}
      </section>
    </>
  );
}
