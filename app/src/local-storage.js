import startPalettes from "./palettes.json";
import { loadPalettes } from "./main";

const defaultPalettes = startPalettes;

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const setPalettes = (newPalettes) => {
  console.log("Set palettes: ", newPalettes);
  setLocalStorageKey("palettes", newPalettes);
};

export const getPalettes = () => {
  console.log("get palette start");

  const storedPalettes = getLocalStorageKey("palettes");

  console.log("get palette end");
  return storedPalettes || {};
};

export const initializePalettesIfEmpty = () => {
  console.log("Initialize start");
  const storedPalettes = getPalettes();
  if (!storedPalettes || Object.keys(storedPalettes).length === 0) {
    setPalettes(defaultPalettes);
  }
  console.log("Initialize end");
};

export const addPalette = (palette) => {
  console.log("Add palette start");
  console.log(palette);
  const storedPalettes = getPalettes();

  storedPalettes[palette.uuid] = palette;

  setPalettes(storedPalettes);
  loadPalettes();

  console.log("Add palette end");
  return palette;
};

export const deletePaletteByID = (paletteID) => {
  const palettes = getPalettes();
  console.log("Before delete: ", palettes);
  delete palettes[paletteID];
  console.log("After delete: ", palettes);
  setPalettes(palettes);
};

export const deleteAllPalettes = () => {
  console.log("Delete All start");

  localStorage.clear();
  setPalettes({});

  console.log("Delete All end");
};
