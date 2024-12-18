import "./style.css";
import palettes from "./palettes.json";
import {
  initializePalettesIfEmpty,
  addPalette,
  deleteAllPalettes,
  getPalettes,
} from "./local-storage.js";
import { newPaletteFunc } from "./dom-helpers";

const defaultPalettes = palettes;
console.log(defaultPalettes);

const loadPalettes = () => {
  const paletteList = document.getElementById("pc");
  const palettes = getPalettes();
  paletteList.innerHTML = "";
  Object.values(palettes).forEach((palette) => {
    newPaletteFunc(palette);
  });
};

export const handleSubmit = (e) => {
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

  addPalette(newPalette);
  loadPalettes();

  form.reset();
};

export const handleCopy = (hexcode) => {
  const copyButton = document.querySelector(
    `button.copy[data-color="${hexcode}"]`
  );
  const text = copyButton.textContent;

  navigator.clipboard.writeText(hexcode).then(() => {
    copyButton.textContent = `${hexcode} Copied!`;

    setTimeout(() => (copyButton.textContent = text), 500);
  });
};

export const handleDeleteAll = () => {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";

  deleteAllPalettes();
  loadPalettes();
};

export const handleDelete = (e) => {
  const button = e.target;
  if (!button.matches(".delete")) return;
  const specificButton = button.dataset.uuid;

  const text = button.textContent;
  button.textContent = "Deleting...";

  setTimeout(() => {
    button.textContent = text;
    const paletteDiv = button.closest(".palette");

    if (paletteDiv) {
      paletteDiv.remove();
    }

    deleteById(specificButton);
  }, 500);
};

const mainAct = async () => {
  await import("/src/dom-helpers.js?t=1734033565029");

  initializePalettesIfEmpty();
  loadPalettes();

  const form = document.querySelector("form");
  form.addEventListener("submit", handleSubmit);

  const deleteAllButton = document.getElementById("deleteAll");
  deleteAllButton.addEventListener("click", handleDeleteAll);

  document
    .querySelector("#palettes-container")
    .addEventListener("click", handleDelete);
};

mainAct();
