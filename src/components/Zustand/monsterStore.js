import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

const useMonsterStore = create(
  //change the name of the store
  persist(
    immer((set) => ({
      // Estados
      spookyImagesInStore: null,
      spookyPromptInStore: "",

      // Acciones
      setSpookyImagesForStore: (imgObject) =>
        set((state) => {
          state.spookyImagesInStore = imgObject;
        }),

      setSpookyPromptForStore: (spookyString) =>
        set((state) => {
          state.spookyPromptInStore = spookyString;
        }),
    })),
    {
      name: "monsterStore", // Nombre de la clave en el local storage
    }
  )
);

export default useMonsterStore;
