import startPalettes from "./palettes.json";
import { v4 as generateUUID } from "uuid";

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
    setPalettes(startPalettes);
  }
};

export const addPalette = (palette) => {
  // generate a todo object with a uuid
  // get existing todos from localStorage
  const storedPalettes = getPalettes();

  // update it with the new todo, using its uuid as the key
  storedPalettes[palette.uuid] = palette;

  // update localStorage
  setPalettes(storedPalettes);

  return palette;
};

export const deletePaletteByID = (paletteToRemove) => {
  const palettes = getPalettes();
  const filteredPalettes = palettes.filter(
    (palette) => palette !== paletteToRemove
  );

  setLocalStorageKey("palettes", filteredPalettes);
  console.log(storedTodos);
  console.log(uuid);
  delete storedTodos[uuid];
  console.log(storedTodos);
  setTodos(storedTodos);
};

export const deleteAllPalettes = () => {
  localStorage.clear();
  setPalettes({});
};

// initializeTodosIfEmpty();
// console.log(getTodos());
// addTodo({
//   uuid: "4190d04b-8f1d-44c9-b96b-1dabc127991e",
//   title: "task 4"
// })
// addTodo({
//   uuid: "5ceca102-6c65-46e7-9eeb-56dba0d25b9d",
//   title: "task 5"
// });
// console.log(getTodos());
// deleteTodoById("4190d04b-8f1d-44c9-b96b-1dabc127991e")
// console.log(getTodos());
// deleteTodoById("5ceca102-6c65-46e7-9eeb-56dba0d25b9d")
// console.log(getTodos());
