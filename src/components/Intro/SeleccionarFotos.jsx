import { useEffect, useState } from "react";

// cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { generativeReplace } from "@cloudinary/url-gen/actions/effect";

// components
import UploadWidget from "../Cloudinary/UploadWidget";
import { Toaster, toast } from "sonner";

// imagenes
import Sundae from "/imgs/Sundae.jpg";
import medioCuerpo from "/imgs/medioCuerpoEjemplo.avif";
import smile from "/imgs/personaEjemplo.jpg";

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
    gatoOriginal: null,
  });
  const [spookyPrompt, setSpookyPrompt] = useState("");

  // funciones y estado del store
  const {
    setSpookyImagesForStore,
    setSpookyPromptForStore,
    spookyImagesInStore, //BORRAR
    spookyPromptInStore, //BORRAR
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
        console.log("prompted img:", imgPrompted.toURL()); //BORRAR
      } catch (err) {
        console.error("Error applying effect:", err); //BORRAR
        toast.error(
          "Parece que hubo un error en la nube ¿habrá sido the_Undefined? 😱 Inténtalo de nuevo con otra imagen",
          { duration: 6666 }
        );
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
          .effect(generativeReplace().from("person").to("demoniac monster"))
          .resize(scale().width(400));
        setImageLoadedDemonio(imgDemonio);
        setImageReadyDemonio(false);
        setSpookyImages((prev) => ({ ...prev, demonio: imgDemonio.toURL() }));
        console.log("demonio img:", imgDemonio.toURL()); //BORRAR
      } catch (err) {
        console.error("Error applying effect:", err); //BORRAR
        toast.error(
          "Parece que hubo un error en la nube ¿habrá sido the_Undefined? 😱 Inténtalo de nuevo con otra imagen",
          { duration: 6666 }
        );
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
        const gatoOriginalUrl = uploadResultGato.info.secure_url;
        const imgGato = cld
          .image(uploadResultGato.info.public_id)
          .effect(generativeReplace().from("cat").to("animal monster"))
          .resize(scale().width(400));
        setImageLoadedGato(imgGato);
        setImageReadyGato(false);
        setSpookyImages((prev) => ({
          ...prev,
          gato: imgGato.toURL(),
          gatoOriginal: gatoOriginalUrl,
        }));
        console.log("gato img:", imgGato.toURL()); //BORRAR
      } catch (err) {
        console.error("Error applying effect:", err); //BORRAR
        toast.error(
          "Parece que hubo un error en la nube ¿habrá sido the_Undefined? 😱 Inténtalo de nuevo con otra imagen",
          { duration: 6666 }
        );
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
        console.log("zombies:", imgZombie.toURL()); //BORRAR
      } catch (err) {
        console.error("Error applying effect:", err); //BORRAR
        toast.error(
          "Parece que hubo un error en la nube ¿habrá sido the_Undefined? 😱 Inténtalo de nuevo con otra imagen",
          { duration: 6666 }
        );
      }
    }
  }, [uploadResultZombie]);

  // handles
  function handleChangePrompt(e) {
    setSpookyPrompt(e.target.value);
    console.log(spookyPrompt); //BORRAR
  }

  function handleComenzarRetos() {
    if (
      spookyImages.demonio &&
      spookyImages.gato &&
      spookyImages.zombie &&
      spookyImages.prompted &&
      spookyPrompt
    ) {
      setSpookyImagesForStore(spookyImages);
      setSpookyPromptForStore(spookyPrompt);
      console.log(spookyImagesInStore, spookyPromptInStore);
    } else {
      toast.error(
        "Por favor, selecciona todas las imágenes y el prompt antes de continuar.",
        {
          duration: 6666,
        }
      );
    }
  }

  const isReadyToProceed =
    spookyImages.demonio &&
    spookyImages.gato &&
    spookyImages.zombie &&
    spookyImages.prompted &&
    spookyPrompt;

  return (
    <>
      <Toaster
        position="bottom-center"
        closeButton
        visibleToasts={1}
        richColors
      />
      <section className={styles.SeleccionarFotos}>
        <section>
          <h2>
            Has decidido enfentrar a
            <br />
            the_Undefined
          </h2>
        </section>
        <p>
          Para empezar con los retos debes seleccionar tres imagenes y elegir
          una de las opciones de texto. Esta información será usada de manera
          terrorífica en los retos. Mira las fotos de ejemplo para tener un
          mejor resultado.
        </p>

        <section className={styles.FotosContainer}>
          <section className="demonio container">
            <h3>Conviertete en Demonio</h3>
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
                  toast.error(
                    "Parece que hubo un error en la nube ¿habrá sido the_Undefined? 😱 Inténtalo de nuevo con otra imagen",
                    { duration: 6666 }
                  );
                }}
                style={{ display: imageReadyDemonio ? "block" : "none" }} // Mostrar solo cuando esté lista
              />
            )}
            {!imageLoadedDemonio && (
              <>
                <img
                  src={medioCuerpo}
                  alt="Una persona pensando en cómo vencer a the_Undefined, o en qué comer después de la batalla, tal vez."
                  className={styles.imgDeEjemplo}
                />
              </>
            )}
          </section>

          <section>
            <h3>Convierte tu gato en monstruo</h3>
            <UploadWidget onUpload={(result) => setUploadResultGato(result)} />
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
                  toast.error(
                    "Parece que hubo un error en la nube ¿habrá sido the_Undefined? 😱 Inténtalo de nuevo con otra imagen",
                    { duration: 6666 }
                  );
                }}
                style={{ display: imageReadyGato ? "block" : "none" }} // Mostrar solo cuando esté lista
              />
            )}
            {!imageLoadedGato && (
              <>
                <img
                  src={Sundae}
                  alt="Un hermoso gato llamado Sundae de Caramelo, con un fonde de un patio común de Costa Rica, lleno de verde"
                  className={styles.imgDeEjemplo}
                />
              </>
            )}
          </section>

          <section>
            <h3>Conviertete en Zombie</h3>
            <UploadWidget
              onUpload={(result) => setUploadResultZombie(result)}
            />
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
                  toast.error(
                    "Parece que hubo un error en la nube ¿habrá sido the_Undefined? 😱 Inténtalo de nuevo con otra imagen",
                    { duration: 6666 }
                  );
                }}
                style={{ display: imageReadyZombie ? "block" : "none" }} // Mostrar solo cuando esté lista
              />
            )}
            {!imageLoadedZombie && (
              <>
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
          <label> Selecciona una opción:</label>
          <select name="spookyPrompt" onChange={handleChangePrompt} className={styles.select}>
            <option value="scary straw man">Hombre de paja</option>
            <option value="crazy doctor eating blood without eyes">
              Doctor Macabro
            </option>
            <option value="demon from hell with computer">Angel caído</option>
          </select>
        </section>

        <Link href={isReadyToProceed ? "/Reto1" : "#"}>
          <button onClick={handleComenzarRetos} disabled={!isReadyToProceed} className={styles.comenzar}>
            { isReadyToProceed ? "Comenzar" : "Aún no puedes comenzar" } 
          </button>
        </Link>
      </section>
    </>
  );
}
