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

export default function name() {
  return <section>Seleccionar fotos</section>;
}
