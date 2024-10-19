import { useEffect, useRef } from "react";

export default function UploadWidget({ onUpload }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "arielcloudinary",
        uploadPreset: "unsignedOctober",
      },
      function (error, result) {
        if (error) {
          console.error("Error al subir imagen. Inténtalo de nuevo", error); // BORRAR AL FINAL
          alert("Error al subir imagen. Inténtalo de nuevo", error);
          onUpload({ success: false, error });
          return;
        } else if (result.event === "success") {
          console.log("¡Subida exitosa a Cloudinary!", result.info); // BORRAR AL FINAL
          onUpload({ success: true, info: result.info });
        }
      }
    );
  }, [onUpload]);

  return (
    <div>
      <button onClick={() => widgetRef.current.open()}>Upload</button>
    </div>
  );
}
