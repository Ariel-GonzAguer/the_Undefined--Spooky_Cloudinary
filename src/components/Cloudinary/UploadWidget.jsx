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
          console.error("Error al subir imagen", error);
          alert("Error al subir imagen", error);
          onUpload({ success: false, error });
          return;
        } else if (result.event === "success") {
          console.log("¡Subida exitosa a Cloudinary!", result.info);
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
