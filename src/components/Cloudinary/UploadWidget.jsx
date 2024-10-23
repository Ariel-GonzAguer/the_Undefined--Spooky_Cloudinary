import { useEffect, useRef } from "react";

// components
import { Toaster, toast } from "sonner";

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
          console.error("Error al subir imagen.", error); // BORRAR AL FINAL
          toast.error("Error al subir imagen. Inténtalo de nuevo", {
            duration: 6666,
          });
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
    <>
      <Toaster
        position="bottom-center"
        closeButton
        visibleToasts={1}
        richColors
      />
      <div>
        <button onClick={() => widgetRef.current.open()}>Upload</button>
      </div>
    </>
  );
}
