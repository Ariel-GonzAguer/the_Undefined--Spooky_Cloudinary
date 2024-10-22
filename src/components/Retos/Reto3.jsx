import { useEffect, useState } from "react";

// estilos
import styles from "./Retos.module.css";
import stylesAnimaciones from "../Intro/Intro.module.css";

// zustand
import useMonsterStore from "../Zustand/monsterStore";

// wouter
import { Link } from "wouter";

// componentes
import { toast, Toaster } from "sonner";

export default function Reto3() {
  // esados para el reto
  const [error, setError] = useState(false);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState(
    new Set()
  );

  // demonio de zustand
  const { spookyImagesInStore } = useMonsterStore((state) => state);
  const demonio = spookyImagesInStore.demonio;

  // handlers
  function respuestaErronea() {
    setError(true);
    toast.error(`Has fallado. Refresca la página para volver a interlo`, {
      duration: 6666,
    });
  }

  function respuestaCorrecta(index) {
    if (!respuestasSeleccionadas.has(index)) {
      setRespuestasSeleccionadas(new Set(respuestasSeleccionadas).add(index));
      setRespuestasCorrectas(respuestasCorrectas + 1);
      if (respuestasCorrectas < 6) {
        toast.success(
          `¡Respuesta correcta! faltan ${5 - respuestasCorrectas}`,
          {
            duration: 6666,
          }
        );
      }
    }
  }

  useEffect(() => {
    if (respuestasCorrectas === 6) {
      toast.success("¡Has escapado de la pesadilla sintáctica!", {
        action: (
          <Link href="/RetoFinal">
            <button>Avanza al Reto Final</button>
          </Link>
        ),
        duration: 6666,
      });
    }
  }, [respuestasCorrectas]);

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

      <div className={error ? styles.demonioVisible : styles.none}>
        <img src={demonio} alt="Demonio" />
      </div>

      <section
        className={
          !error && respuestasCorrectas <= 6 ? styles.Reto3 : styles.none
        }
      >
        <h2 className={styles.textoFantasma}>Reto 3</h2>
        <h3>Syntax error</h3>
        <p>
          Tu versión zombie no fue lo suficientemente veloz, tal vez si puedas
          vencer a{" "}
          <span className={stylesAnimaciones.flicker}>the_Undefined</span>.
        </p>
        <p>
          ¿Pero podrás huir de una pesadilla sintáctica demoniaca, o serás
          arrastrado a un lugar de dónde nunca más podrás volver?
        </p>
        <p>
          En este reto debes hacer click sobre las seis líneas de código con
          errores. Si tocas una línea que no está mal, tu versión demoniaca se
          apoderará de tu pantalla y deberás reiniciar la página para volver a
          intentarlo.
        </p>

        <section className={styles.retoCodigo}>
          <p onClick={respuestaErronea}>function alimentar(nombre) {"{"}</p>
          <p onClick={() => respuestaCorrecta(1)}>
            <span className={styles.noSpan}>&nbsp;</span>if (nombre = 'Gatanás'){" "}
            {"{"}
          </p>{" "}
          {/* Error de sintaxis */}
          <p onClick={respuestaErronea}>
            <span className={styles.noSpan}>&nbsp;&nbsp;</span>console.log(
            'Come, Gatanás :3');
          </p>
          <p onClick={respuestaErronea}>
            <span className={styles.noSpan}>&nbsp;&nbsp;</span>
            {"}"} else {"{"}{" "}
          </p>
          <p onClick={() => respuestaCorrecta(2)}>
            <span className={styles.noSpan}>&nbsp;&nbsp;</span>console.log(
            'Hola', nombre.toUppercase());
          </p>
          {/* Error de sintaxis */}
          <p onClick={respuestaErronea}>
            <span className={styles.noSpan}>&nbsp;&nbsp;</span>
            {"}"}
          </p>
          <p>{""}</p>
          <p onClick={respuestaErronea}>
            <span className={styles.noSpan}>&nbsp;</span>const edad = 25;
          </p>
          <p onClick={() => respuestaCorrecta(3)}>
            <span className={styles.noSpan}>&nbsp;</span>edad = 66.6;
          </p>
          {/* Error de sintaxis */}
          <p>{""}</p>
          <p onClick={respuestaErronea}>
            <span className={styles.noSpan}>&nbsp;</span>let arrayDeDemonios =
            ['Gatbaddón', 'Miaulzebú', 'Catsmoteo'];
          </p>
          <p onClick={() => respuestaCorrecta(4)}>
            <span className={styles.noSpan}>&nbsp;</span>for (let i; i {"<"}{" "}
            arrayDeDemonios.length; i++) {"{"}
          </p>
          {/* Error de sintaxis */}
          <p onClick={respuestaErronea}>
            <span className={styles.noSpan}>&nbsp;&nbsp;</span>
            console.log( arrayDeDemonios[i]);
          </p>
          <p onClick={respuestaErronea}>
            <span className={styles.noSpan}>&nbsp;&nbsp;&nbsp;</span>
            {"}"}
          </p>
          <p>{""}</p>
          <p onClick={respuestaErronea}>
            <span className={styles.noSpan}>&nbsp;&nbsp;</span>let ganarHackaton
            = 'Ganar Cloudinary Hackaton ';
          </p>
          <p onClick={() => respuestaCorrecta(5)}>
            <span className={styles.noSpan}>&nbsp;&nbsp;</span>
            console.log( ganarHackaton('yo, true'));
          </p>
          {/* Error de sintaxis */}
          <p>{""}</p>
          <p onClick={respuestaErronea}>
            <span className={styles.noSpan}>&nbsp;&nbsp;&nbsp;</span>return
            ganarHackaton;
          </p>
          <p onClick={respuestaErronea}>
            <span className={styles.noSpan}>&nbsp;</span>
            {"}"}
          </p>
          <p>{""}</p>
          <p onClick={() => respuestaCorrecta(6)}>alimentar('Sundae'{"]"},</p>
          {/* Error de sintaxis */}
          <p>{""}</p>
        </section>
      </section>
    </>
  );
}
