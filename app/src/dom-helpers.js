import { getPalettes } from "./local-storage.js";

export const newPaletteFunc = (newPalette) => {
  const li = document.createElement("li");

  li.dataset.uuid = newPalette.uuid;
  li.innerHTML = `<h2>${newPalette.title}</h2>
    <div class="palette-content">
      <div class="colors-container">
        <div class="color1">
          <p>Text <span>Example</span></p>
          <button type="button">
            Copy  <span class="hexcode">${newPalette.colors[0]}</span>
          </button>
        </div>
  
        <div class="color2">
          <p>Text <span>Example</span></p>
          <button type="button">
            Copy  <span class="hexcode">${newPalette.colors[1]}</span>
          </button>
        </div>
  
        <div class="color3">
          <p>Text <span>Example</span></p>
          <button type="button" id="copy">
            Copy  <span class="hexcode">${newPalette.colors[2]}</span>
          </button>
        </div>
      </div>
  
      <button type="button" id="delete">Delete Palette</button>
  </div>
  <div class="temperature">${newPalette.temperature}</div>`;

  return li;
};

export const loadPalettes = () => {
  const paletteList = document.getElementById("palettesList");
  const palettes = getPalettes();
  paletteList.innerHTML = "";
  Object.values(palettes).forEach((palette) => {
    const listItem = newPaletteFunc(palette);
    paletteList.appendChild(listItem);
  });
};
