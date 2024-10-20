import { useEffect, useState } from "react";

// cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import {
  generativeBackgroundReplace,
  generativeReplace,
} from "@cloudinary/url-gen/actions/effect";

// components
import UploadWidget from "../Cloudinary/UploadWidget";

// imagenes
import Sundae from "/imgs/Sundae.jpg";
import rostroEjemplo from "/imgs/rostroEjemplo.jpg";
import smile from "/imgs/smile.jpg";

// styles
import styles from "./SeleccionarFotos.module.css";

// zustand
import useMonsterStore from "../Zustand/monsterStore";

// wouter
import { Link } from "wouter";

export default function SeleccionarFotos() {
  /*Zustand*/
  // estados para el store
  const [spookyImages, setSpookyImages] = useState({
    demonio: null,
    gato: null,
    zombie: null,
    prompted: null,
  });
  const [spookyPrompt, setSpookyPrompt] = useState("");

  // funciones y estado del store
  const {
    setSpookyImagesForStore,
    setSpookyPromptForStore,
    spookyImagesInStore,
    spookyPromptInStore,
  } = useMonsterStore();

  /*Cloudinary */
  const cld = new Cloudinary({ cloud: { cloudName: "arielcloudinary" } });

  //estados para UI
  // prompted
  useEffect(() => {
    if (spookyPrompt) {
      try {
        const imgPrompted = cld
          .image("october/pirataIA_NOBORRAR")
          .effect(generativeReplace().from("person").to(spookyPrompt))
          .resize(scale().width(500));
        setSpookyImages((prev) => ({ ...prev, prompted: imgPrompted.toURL() }));
        console.log("prompted img:", imgPrompted.toURL());
      } catch (err) {
        console.error("Error applying effect:", err);
      }
    }
  }, [spookyPrompt]);

  // demonio
  const [uploadResultDemonio, setUploadResultDemonio] = useState(null);
  const [imageLoadedDemonio, setImageLoadedDemonio] = useState(null);
  const [imageReadyDemonio, setImageReadyDemonio] = useState(false);

  useEffect(() => {
    if (uploadResultDemonio && uploadResultDemonio.success) {
      try {
        const imgDemonio = cld
          .image(uploadResultDemonio.info.public_id)
          .effect(generativeReplace().from("person").to("demoniac monster")) // CAMBIAR?
          .resize(scale().width(400));
        setImageLoadedDemonio(imgDemonio);
        setImageReadyDemonio(false);
        setSpookyImages((prev) => ({ ...prev, demonio: imgDemonio.toURL() }));
        console.log("demonio img:", imgDemonio.toURL());
      } catch (err) {
        console.error("Error applying effect:", err);
      }
    }
  }, [uploadResultDemonio]);

  // gato
  const [uploadResultGato, setUploadResultGato] = useState(null);
  const [imageLoadedGato, setImageLoadedGato] = useState(null);
  const [imageReadyGato, setImageReadyGato] = useState(false);

  useEffect(() => {
    if (uploadResultGato && uploadResultGato.success) {
      try {
        const imgGato = cld
          .image(uploadResultGato.info.public_id)
          .effect(
            generativeReplace()
.from("cat").to("animal monster")) // CAMBIAR
          .resize(scale().width(400));
        setImageLoadedGato(imgGato);
        setImageReadyGato(false);
        setSpookyImages((prev) => ({
          ...prev,
          gato: imgGato.toURL(),
        }));
        console.log("gato img:", imgGato.toURL());
      } catch (err) {
        console.error("Error applying effect:", err);
      }
    }
  }, [uploadResultGato]);

  // zombie
  const [uploadResultZombie, setUploadResultZombie] = useState(null);
  const [imageLoadedZombie, setImageLoadedZombie] = useState(null);
  const [imageReadyZombie, setImageReadyZombie] = useState(false);

  useEffect(() => {
    if (uploadResultZombie && uploadResultZombie.success) {
      try {
        const imgZombie = cld
          .image(uploadResultZombie.info.public_id)
          .effect(generativeReplace().from("person").to("demoniac zombie"))
          .resize(scale().width(500));
        setImageLoadedZombie(imgZombie);
        setImageReadyZombie(false); // Reset imageReady to false while loading
        setSpookyImages((prev) => ({ ...prev, zombie: imgZombie.toURL() }));
        console.log("zombies:", imgZombie.toURL());
      } catch (err) {
        console.error("Error applying effect:", err);
      }
    }
  }, [uploadResultZombie]);

  // handles
  function handleChangePrompt(e) {
    setSpookyPrompt(e.target.value);
    console.log(spookyPrompt);
  }

  function handleComenzarRetos() {
    setSpookyImagesForStore(spookyImages);
    setSpookyPromptForStore(spookyPrompt);
    console.log(spookyImagesInStore, spookyPromptInStore);
  }

  return (
    <section className={styles.SeleccionarFotos}>
      <h2>
        Has decidido enfentrar a
        <br />
        the_Undefined
      </h2>
      <p>
        Para empezar con los retos debes seleccionar tres imagenes y elegir una
        de las opciones de texto. Esta información será usada de manera
        terrorífica en los retos.
      </p>

      <section className={styles.FotosContainer}>
        <section>
          <h3>Demonio</h3>
          <UploadWidget
            onUpload={(result) => setUploadResultDemonio(result)}
          />
          {imageLoadedDemonio && !imageReadyDemonio && (
            <div className={styles.loaderSkull}></div>
          )}
          {imageLoadedDemonio && (
            <AdvancedImage
              cldImg={imageLoadedDemonio}
              onLoad={() => {
                console.log("AdvancedImage onLoad triggered");
                setImageReadyDemonio(true); // Actualizar el estado cuando la imagen de Cloudinary esté lista
              }}
              onError={(e) => {
                console.error("Error loading image:", e);
                alert(
                  "Error applying effect. Please try again with a different image."
                );
              }}
              style={{ display: imageReadyDemonio ? "block" : "none" }} // Mostrar solo cuando esté lista
            />
          )}
          {!imageLoadedDemonio && (
            <>
              <p>Ejemplo</p>
              <img
                src={rostroEjemplo}
                alt="Una persona pensando en cómo vencer a the_Undefined, o en qué comer después de la batalla, tal vez."
                className={styles.imgDeEjemplo}
              />
            </>
          )}
        </section>

        <section>
          <h3>Gato</h3>
          <UploadWidget
            onUpload={(result) => setUploadResultGato(result)}
          />
          {imageLoadedGato && !imageReadyGato && (
            <div className={styles.loaderSkull}></div>
          )}
          {imageLoadedGato && (
            <AdvancedImage
              cldImg={imageLoadedGato}
              onLoad={() => {
                console.log("AdvancedImage onLoad triggered");
                setImageReadyGato(true); // Actualizar el estado cuando la imagen de Cloudinary esté lista
              }}
              onError={(e) => {
                console.error("Error loading image:", e);
                alert(
                  "Error applying effect. Please try again with a different image."
                );
              }}
              style={{ display: imageReadyGato ? "block" : "none" }} // Mostrar solo cuando esté lista
            />
          )}
          {!imageLoadedGato && (
            <>
              <p>Ejemplo</p>
              <img
                src={Sundae}
                alt="Un hermoso gato llamado Sundae de Caramelo, con un fonde de un patio común de Costa Rica, lleno de verde"
                className={styles.imgDeEjemplo}
              />
            </>
          )}
        </section>

        <section>
          <h3>Zombie</h3>
          <UploadWidget onUpload={(result) => setUploadResultZombie(result)} />
          {imageLoadedZombie && !imageReadyZombie && (
            <div className={styles.loaderSkull}></div>
          )}
          {imageLoadedZombie && (
            <AdvancedImage
              cldImg={imageLoadedZombie}
              onLoad={() => {
                console.log("AdvancedImage onLoad triggered");
                setImageReadyZombie(true); // Actualizar el estado cuando la imagen de Cloudinary esté lista
              }}
              onError={(e) => {
                console.error("Error loading image:", e);
                alert(
                  "Error applying effect. Please try again with a different image."
                );
              }}
              style={{ display: imageReadyZombie ? "block" : "none" }} // Mostrar solo cuando esté lista
            />
          )}
          {!imageLoadedZombie && (
            <>
              <p>Ejemplo</p>
              <img
                src={smile}
                alt="Una persona sonriendo, con un fondo de un bosque de pinos"
 className={styles.imgDeEjemplo}
              />
            </>
          )}
        </section>
      </section>

      <section className={styles.SpookyPrompt}>
        <label> Seleccionaa una opción de texto:</label>
        <select name="spookyPrompt" onChange={handleChangePrompt}>
          <option value="scary straw man">Hombre de paja</option>
          <option value="crazy doctor eating blood without eyes">Dentista</option>
          <option value="demon from hell with computer">Programador</option>
        </select>
      </section>

      <Link href="/Reto1">
        <button onClick={handleComenzarRetos}>Comenzar</button>
      </Link>
    </section>
  );
}
