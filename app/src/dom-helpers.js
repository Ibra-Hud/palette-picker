import { handleCopy } from "./main.js";

export const liForDom = (div) => {
  const li = document.createElement("li");
  li.append(div);
};

const copyButton = (hexcode) => {
  const button = document.createElement("button");
  button.classList.add("copy");
  button.textContent = `Copy ${hexcode}`;
  button.dataset.color = hexcode;
  button.addEventListener("click", () => handleCopy(hexcode));

  return button;
};

const deleteButtonForDom = (newPalette) => {
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add("delete");
  deleteButton.textContent = "Delete Palette";
  deleteButton.dataset.uuid = newPalette.uuid;

  return deleteButton;
};

const temperatureForDom = (newPalette) => {
  const divTemp = document.createElement("div");
  divTemp.classList.add(`${newPalette.temperature}`);
  divTemp.textContent = `${newPalette.temperature}`;
  return divTemp;
};

const colorForDom = (newPalette) => {
  const ul = document.createElement("ul");
  ul.className = "colors";

  newPalette.colors.forEach((color) => {
    const div = document.createElement("div");
    div.classList.add("color-container");
    div.dataset.color = color;

    const li = document.createElement("li");

    const p = document.createElement("p");
    p.textContent = "Text Example";
    p.style.backgroundColor = color;

    const copy = copyButton(color);

    div.append(p);
    li.append(div, copy);
    ul.append(li);
  });

  return ul;
};

export const newPaletteFunc = (newPalette) => {
  const palettesContainer = document.getElementById("pc");

  const div = document.createElement("div");
  div.classList.add("palette");
  div.dataset.uuid = newPalette.uuid;

  const h3 = document.createElement("h3");
  h3.textContent = newPalette.title;

  const color = colorForDom(newPalette);

  const temp = temperatureForDom(newPalette);

  div.append(h3, color, deleteButtonForDom(newPalette), temp);
  palettesContainer.append(div);
};
