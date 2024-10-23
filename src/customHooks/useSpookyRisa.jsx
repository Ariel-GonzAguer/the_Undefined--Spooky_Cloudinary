import { useState } from "react";
import spookyRisa from "/audios/spooky-wizard-laugh-01-253266-by-nelsonricardo.mp3";

export default function useSpookyRisa() {
  const [audio] = useState(new Audio(spookyRisa));
  function playSpookyRisa() {
    audio.play();
  }

  return playSpookyRisa;
}
