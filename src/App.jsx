import { useState } from "react";

// wouter
import { Route, Switch } from "wouter";

import styles from "./App.module.css";

// componentes
import Intro from "./components/Intro/Intro";
import Huir from "./components/Intro/Huir";
import SeleccionarFotos from "./components/SeleccionarFotos/SeleccionarFotos";
import Reto1 from "./components/Retos/Reto1";
import Reto2 from "./components/Retos/Reto2";
import Reto3 from "./components/Retos/Reto3";
import RetoFinal from "./components/Retos/RetoFinal";
import NotFound from "./components/Intro/NotFound";

export default function App() {
  return (
    <>
      <section className={styles.App}>
        <Switch>
          <Route path="/" component={Intro} />
          <Route path="Huir" component={Huir} />
          <Route path="/SeleccionarFotos" component={SeleccionarFotos} />
          <Route path="Reto1" component={Reto1} />
          <Route path="Reto2" component={Reto2} />
          <Route path="Reto3" component={Reto3} />
          <Route path="RetoFinal" component={RetoFinal} />
          <Route path="*" component={NotFound} />
        </Switch>
      </section>
    </>
  );
}
