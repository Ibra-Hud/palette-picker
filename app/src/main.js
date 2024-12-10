import "./style.css";
import palettes from "./palettes.json";
import {
  getPalettes,
  initializePalettesIfEmpty,
  addPalette,
  deletePaletteByID,
  deleteAllPalettes,
  setPalettes,
} from "./local-storage.js";
import { loadPalettes, newPaletteFunc } from "./dom-helpers";

initializePalettesIfEmpty();
document.addEventListener("DOMContentLoaded", loadPalettes);

const defaultPalettes = palettes;

console.log(defaultPalettes);

const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const newPaletteID = crypto.randomUUID();

  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData);
  const { paletteTitle, color1, color2, color3, temp } = formObject;

  const newPalette = {
    uuid: newPaletteID,
    title: paletteTitle,
    colors: [color1, color2, color3],
    temperature: temp,
  };

  const paletteToAdd = addPalette(newPalette);
  newPaletteFunc(paletteToAdd);
  loadPalettes();

  form.reset();
};

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

// const handleCopy = (e) => {
//   const copyButton = e.target;
// };

// const copyButton = document.getElementById("delete");
// copyButton.addEventListener("click", handleCopy);

const handleDeleteAll = (e) => {
  const deleteAll = e.target;
  const ul = document.querySelector("ul");
  ul.innerHTML = "";

  deleteAllPalettes();
};

const deleteAllButton = document.getElementById("deleteAll");
deleteAllButton.addEventListener("click", handleDeleteAll);
