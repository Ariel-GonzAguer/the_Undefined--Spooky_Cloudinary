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
        styles:{
          palette: {
            window: "rgba(93, 38, 70, 1)",
            windowBorder: "rgba(14, 15, 20, 1)",
            tabIcon: "rgba(255, 165, 46, 1)",
            menuIcons: "rgba(255, 165, 46, 1)",
            textDark: "rgba(255, 255, 255, 1)",
            textLight: "rgba(14, 15, 20, 1)",
            link:  "rgba(158, 31, 255, 1)",
            action:  "rgba(202, 255, 55, 1)",
            inactiveTabIcon: "rgba(245, 238, 209, 1)",
            inProgress: "rgba(158, 31, 255, 1)",
            complete: "rgba(202, 255, 55, 1)",
            sourceBg: "rgba(238, 200, 12, 1)"
          },
          frame: {
            background: "rgba(0, 0, 0, 0.3)"
          },
        }
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
