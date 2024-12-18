import startPalettes from "./palettes.json";

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
  setLocalStorageKey("palettes", newPalettes);
};

export const getPalettes = () => {
  const storedPalettes = getLocalStorageKey("palettes");
  return storedPalettes || {};
};

export const initializePalettesIfEmpty = () => {
  const storedPalettes = getPalettes();
  if (!storedPalettes || Object.keys(storedPalettes).length === 0) {
    setPalettes(defaultPalettes);
  }
};

export const addPalette = (palette) => {
  const storedPalettes = getPalettes();

  storedPalettes[palette.uuid] = palette;

  setPalettes(storedPalettes);

  return palette;
};

export const deletePaletteByID = () => {
  const palettes = getPalettes();
  delete palettes[paletteID];
  setPalettes(palettes);
};

export const deleteAllPalettes = () => {
  localStorage.clear();
  setPalettes({});
};
