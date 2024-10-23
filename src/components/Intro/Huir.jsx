import { useEffect } from "react";

// componentes
import { Toaster, toast } from "sonner";

// estilos
import styles from "./Intro.module.css";

// wouter
import { Link } from "wouter";

export default function Huir() {
  useEffect(() => {
    toast.warning("Decidiste huir... ¿Quieres volver a la página principal?", {
      action: (
        <Link href="/">
          <button>Si, quiero volver</button>
        </Link>
      ),
    });
  }, []);

  return (
    <>
      <Toaster
        position="bottom-center"
        closeButton
        visibleToasts={1}
        richColors
      />
      <section
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--negro)",
        }}
      >
        <div>
          <h1
            className={styles.flicker}
            style={{
              fontSize: "3.5rem",
              margin: "2rem auto 3rem",
              backgroundColor: "var(--vino)",
              color: "var(--verdeClaro)",
              padding: "0.6rem",
            }}
          >
            the_Undefined
          </h1>
        </div>
      </section>
    </>
  );
}
