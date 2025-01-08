import "./style.css";
import palettes from "./palettes.json";
import {
  initializePalettesIfEmpty,
  addPalette,
  deleteAllPalettes,
  getPalettes,
  deletePaletteByID,
} from "./local-storage.js";
import { newPaletteFunc } from "./dom-helpers";

const defaultPalettes = palettes;
console.log(defaultPalettes);

export const loadPalettes = () => {
  console.log("Load palettes start");
  const paletteList = document.getElementById("pc");
  const palettes = getPalettes();
  paletteList.innerHTML = "";
  Object.values(palettes).forEach((palette) => {
    newPaletteFunc(palette);
  });

  console.log("Load palettes end");
};

export const handleSubmit = (e) => {
  console.log("Handle Submit start");
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

  if (newPalette.title != "") {
    addPalette(newPalette);
    console.log("Handle Submit end");
  }

  form.reset();
};

export const handleCopy = (hexcode) => {
  console.log("Handle Copy Start");
  const copyButton = document.querySelector(
    `button.copy[data-color="${hexcode}"]`
  );
  const text = copyButton.textContent;

  navigator.clipboard.writeText(hexcode).then(() => {
    copyButton.textContent = `${hexcode} Copied!`;

    setTimeout(() => (copyButton.textContent = text), 500);
  });
  console.log("Handle Copy End");
};

export const handleDeleteAll = () => {
  console.log("Handle DeleteAll Start");
  const ul = document.querySelector("ul");
  ul.innerHTML = "";

  deleteAllPalettes();
  loadPalettes();
  console.log("Handle DeleteAll end");
};

export const handleDelete = (e) => {
  console.log("Handle Delete Start");
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

    deletePaletteByID(specificButton);
  }, 500);
  console.log("Handle Delete end");
};

const mainAct = async () => {
  console.log("main start");
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
  console.log("main end");
};

mainAct();
