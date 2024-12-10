# 2.3.0 - Solo Project: Palette Picker

- [Getting Started](#getting-started)
- [Project Description](#project-description)
- [User Stories](#user-stories)
- [Tech Tips](#tech-tips)
  - [HTML](#html)
    - [Data attributes](#data-attributes)
    - [Color inputs](#color-inputs)
    - [Required fields](#required-fields)
  - [JavaScript](#javascript)
    - [Organization](#organization)
    - [esModules](#esmodules)
    - [palettes.json](#palettesjson)
    - [UUIDs](#uuids)
    - [Saving to localStorage](#saving-to-localstorage)
    - [Copying to the clipboard](#copying-to-the-clipboard)
- [Tech Rubric](#tech-rubric)
  - [Layout: Structure](#layout-structure)
  - [layout: Accessibility](#layout-accessibility)
  - [Functionality](#functionality)
  - [Meta](#meta)

## Getting Started

To work on this project, **do not clone this repo and do not fork this project.** This repo will just serve as your instructions.

Instead, create a new repository called **palette-picker** that lives on your own account. When creating the repository, make sure it has the following settings:

- The name is **palette-picker** (one "L", two "T"s)
- It is public
- It has a README.md

Once you have your repo created, clone it down into your `unit-2` directory, and `cd` into it.

Then, create a Vite project inside called `app` with the following commands:

```sh
npm create vite
# > Project Name: app
# > Select a framework: Vanilla
# > Select a variant: JavaScript
cd app
npm i
```

Finally, [follow these steps to set up the file structure for your project](https://marcylabschool.gitbook.io/marcy-lab-school-docs/fullstack-curriculum/how-tos/vite#make-the-project-your-own).

## Project Description

We're going to be building a palette picker program today. A "color palette" is a set of colors that go well together. We're going to be building a program that allows users to create their own palettes, and save them for later. We'll also be able to delete palettes, and copy the colors to the clipboard.

In real life, design palettes can include dozens of colors to handle all aspects of a website: headings, text, background colors, buttons, links, and so on. Today, we're keeping it simple and only using 3 colors per palette.

When you're done, you should have an app with a form for creating palettes and the palettes displayed beneath it, like this:

![palette picker default view](./images/site-default.png)

And here it is with more palettes created. You should use `flexbox` or `grid` to handle the layout of the palettes.

![palette picker multiple rows](./images/multiple-rows.png)

## User Stories

As always, let's start our journey with the user, what can they actually do with our site?

A **user story** is a description of what a user would do (ideally) with our website once we're done. We write user stories to help us organize and priorities the features that we want to implement.

There are also technical requirements below (e.g. you must have a `form`, you must use `grid` or `flexbox`, and so on), but thinking about the finished product in terms of our user experience is just as useful, if not more important!

We will write user stores in the format: "a user [what the user can do]"

A user:

- Can create a palette by filling out a form
- Can provide their palette with a title, choose three colors, and a palette "temperature"
- Can't submit a form without giving it a title
- Can visually choose their colors using a color picker
- Can see all the palettes they create in the `palettes` section of the page
- Is provided with 3 default palettes the first time they visit the site (or if they delete all their palettes)
- Can see their colors with a black and white text example overlaid on each color
- Can see their colors with a black and white border around each one
- Can see the temperature of each palette in a banner along the bottom of each one
- Can click a button next to any color to copy the hex code to their clipboard (`#ffffff` for example)
- Can click the copy button and see the text change to "Copied hex!" for 1 second before switching back
- Can delete a palette they don't like by clicking the delete button
- Has their palettes saved so even if they close the site, upon returning they can see their palettes

Here are some close ups and examples of what we're looking for:

![palettes](images/palettes.png)

Here's the color picker:

![palettes](images/color-type-input.png)

## Tech Tips

This is a big project, so here are some helpful things for you to consider. Also, keep in mind you can look at the rubric at the end as a sort of guide to what you need to do.

### HTML

#### Data attributes

Some things in this project get _way_ easier if you know what a `data-` attribute is and why you'd likely want them on buttons. If you are unfamiliar with data attributes in html and `dataset` in JS, make sure you read up on them (your DOM assignments used them!).

#### Color inputs

You know how there's a ton of input types? Check out `input type="color"` for this project! Read up on how the value of a color input is returned.

#### Required fields

Do you know how to make an HTML form treat an input as `required`? It's not hard, try figuring it out, and make sure the text input is required!

### JavaScript

#### Organization

We recommend that you store all `.js` and `.css` files in an `app/src/` directory, leaving only the `index.html` file and configuration files in the root of your `app/` directory.

Within `src/`, we recommend that break up your application into separate files that each handle a single responsibility. The recommended files are:

- `local-storage.js` - contains helpers for managing local storage (feel free to copy the starter code we've provided in this repo)
- `dom-helpers.js` - contains helpers for manipulating the DOM
- `main.js` - contains the main logic that sets up event handlers and executes initialization functions.

### esModules

Remember, Vite doesn't use commonjs modules like node.

Here's a [crash course on esmodules](https://www.youtube.com/watch?v=cRHQNNcYf6s) if you need it.

Honestly though, to start it's a real simple notation change:

```js
// commonjs default import
const library = require('library-name');
const localModule = require('./local-module');

// esmodules default import
import library from 'library-name';
import localModule from './local-module';


// commonjs named import
const { namedThing } = require('library-name');
const { namedLocal } = require('./local-module');

// esmodules named import
import { namedThing } from 'library-name';
import { namedLocal } from './local-module';

// esmodules named import with alias
const { namedThing as alias } = require('library-name');

// common js default export
module.exports = namedThing;

// esmodules default export
export default namedThing;

// commonjs named export
module.exports = { namedThing };

// esmodules named export:
// - each one
export const thing = () => {}
export const otherThing = () => {}
// or all together
export {
  thing2,
  otherThing2
}
```

There are a few more bells and whistles but that's honestly all you need.

Also, what's super cool with Vite is that you can load in some style files in your JS instead of with your html. So don't panic when you see

```js
import "./styles.css";
```

#### palettes.json

To start, we're giving you the data for 3 palettes in a `json` format. In your own repo, create a `palettes.json` file and copy the data below into it.

```json
{
  "5affd4e4-418d-4b62-beeb-1c0f7aaff753": {
    "uuid": "5affd4e4-418d-4b62-beeb-1c0f7aaff753",
    "title": "Marcy",
    "colors": ["#c92929", "#2f5a8b", "#327a5f"],
    "temperature": "neutral"
  },
  "32521ef4-d64c-4906-b06d-f3d0d6b16e0f": {
    "uuid": "32521ef4-d64c-4906-b06d-f3d0d6b16e0f",
    "title": "Sleek and Modern",
    "colors": ["#3A5199", "#2F2E33", "#D5D6D2"],
    "temperature": "cool"
  },
  "8b144d62-faa7-4226-87e1-096d7c1bedc7": {
    "uuid": "8b144d62-faa7-4226-87e1-096d7c1bedc7",
    "title": "Winter Reds",
    "colors": ["#A10115", "#C0B2B5", "#600A0A"],
    "temperature": "warm"
  }
}
```

Thanks to ES6 modules and Vite, you can just use `import` to import this object of objects into your code.

```js
import palettes from "./palettes.json";
console.log(palettes); // It's now regular JS code!
```

Pretty cool right? The only catch is you _must_ specify the file type `.json`. Use the data in this file to generate your default palettes.

#### UUIDs

This data is organized as an object of objects. This is a common strategy! Each object represents the data for an individual palette. The key to access each object is the object's **universally unique id (uuid)**. That `uuid` is also stored inside of each object.

Though it's a bit overkill for this project, it is a good practice to use UUIDs to organize data. In particular, it makes finding and deleting individual entries much more efficient. To generate your own UUID values, we'll use the `uuid` npm package:

```bash
npm i uuid
```

Then, we'll import the `v4()` function from `uuid`, renaming it to `generateUUID`. Whenever you need a new UUID you can just invoke that function:

```js
import { v4 as generateUUID } from "uuid";

const newPaletteID = generateUUID();
```

#### Saving to localStorage

> We do not want to use `sessionStorage` that's different!

We want our palettes to persist across sessions. We don't need databases to do this, assuming we're ok with only saving the data to the user's browser. Here's an [article explaining localStorage](https://www.freecodecamp.org/news/how-to-store-data-in-web-browser-storage-localstorage-and-session-storage-explained/)

Once you understand the basics of `localStorage`, you can make some helper functions like:

- `setLocalStorageKey(key, value)` - This is a wrapper that automatically stringifies the value and sets it to the key

  ```js
  const setLocalStorageKey = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  ```

- `getLocalStorageKey(key)` - This is a wrapper that automatically parses the value and returns it, but also handles the errors (`JSON.parse` should always be wrapped in a `try/catch` since it breaks so easily). If there's an error it `console.errors` it and returns `null`

  ```js
  const getLocalStorageKey = (key) => {
    const storedValue = localStorage.getItem(key);
    return JSON.parse(storedValue);
  };
  ```

With those two out of the way, it is recommended that you make some more focused helper functions like:

- `setPalettes(newPalettes)`
  - Replace whatever palettes are saved in `localStorage` with the provided object of `newPalettes`
- `getPalettes()`
  - Get the palettes object stored in `localStorage` Always return an object, either full of palettes or empty. If it always returns an object, it will make the code that uses this function simpler.
- `initPalettesIfEmpty()`
  - This one is important! If you don't have any palettes on page load, then you should add the default palettes to localStorage. _To be clear, that's on page load, not immediately following the event that they delete all of the palettes_. So if the user deletes each palette, only if they refresh the page, the defaults will appear
- `addPalette(newPalette)`
  - Add the palette to your saved localStorage palettes. First retrieve the existing palettes, add the new palette to the object, and then set the palettes again.
- `removePalette(paletteUuid)`
  - Remove the palette from your saved localStorage palettes as found by the palette's `uuid`. First retrieve the existing palettes, find and remove the specified palette from the object, and then set the palettes again.

Remember these functions are all _only_ the data layer of our project. None of them should be touching the DOM, that's the job of other rendering functions. For example, `removePalette()` should only remove the palette from the localStorage object, do not try to remove it from the DOM in this function.

#### Copying to the clipboard

This used to be a pain, but now it's not! Check out this [article explaining how to copy with the clipboard API](https://chiamakaikeanyi.dev/how-to-copy-text-with-ease-in-javascript-using-the-clipboard-api/). This is a crucial feature, don't forget it!

And don't forget that users need some confirmation of a copy, so alter the buttons text for a second to say "Copied hex!" for 1 second before switching back. Remember `setTimeout`?

## Tech Rubric

In order to see how well you're doing with this project, here are all the things we need would like to see from you. If you get all of these, then you know that you're where you need to be!

### Layout: Structure

- [ ] There is a single `main` element on the page
- [ ] There is a single `h1` element on the page
- [ ] There is a `form`
- [ ] The form has an `h2` label
- [ ] The form has an `text` input and label for the palette title
- [ ] The form has 3 `color` type inputs and labels for the color inputs
- [ ] The form has a `fieldset` with a `legend` for the temperature setting
- [ ] The form has 3 `radio` inputs and `labels` for the temperature setting
- [ ] The form has `neutral` as the default temperature setting
- [ ] The form has a `button` to submit the form
- [ ] There is a `section` for the palettes
- [ ] There is an `h2` showing the palettes section
- [ ] The page has a `ul` and `li` items that show each palette
- [ ] Each palette has the 3 colors clearly visible somehow
- [ ] Each palette has white and black text overlaid on each of the colors
- [ ] Each palette _somehow_ has white and black border on each of the colors
- [ ] Each palette has 3 copy buttons that show the name of the color they _would_ copy
- [ ] Each palette has a delete button
- [ ] Each palette has a banner along the bottom with the name of the temperature
- [ ] Each palette has a banner along the bottom that is colored by the temperature
  - (gray = neutral, red = warm, blue = cool)
- [ ] Palettes appear next to each other in an organized, responsive, well-spaced layout (flex or grid presentations fine)

### layout: Accessibility

- [ ] The form has an `aria-label` or `aria-labelledby` attribute that describes the form
- [ ] The section has an `aria-label` or `aria-labelledby` attribute that describes the section
- [ ] There are no instances of recreating any semantic elements

### Functionality

- [ ] The title is a `required` field, and the form cannot be submitted without it
- [ ] Clicking the form submit button does not reload the page because the default behavior is prevented
- [ ] Clicking the form submit button creates a new palette in the palettes section
- [ ] Clicking the form submit button clears the form
- [ ] Clicking one of the copy buttons copies the hex code of the color to the clipboard
- [ ] Clicking the copy button copies the selected color to the user's clipboard
- [ ] Clicking the copy button alters the text for a second to say "Copied hex!" for 1 second before switching back
- [ ] Clicking the delete button removes the palette from the page
- [ ] Clicking the delete button removes the palette from localStorage (does not come back upon reload of page)
- [ ] On first visit to the page, there are 3 default palettes
- [ ] If a user deletes all their palettes, on next reload, the default palettes appear again
- [ ] A user's palettes are saved to localStorage

### Meta

- [ ] The project is created using Vite
- [ ] The code exists in more than one JS file
- [ ] The project is deployed via GitHub Pages properly
- [ ] The `palettes.json` file is read properly
- [ ] css flexbox or grid was used
- [ ] The code does not render unescaped text directly to the DOM (createElement or other escape method used)
- [ ] `.innerHTML` or `createElement/.append` is used properly at some point in the project
- [ ] `.innerHTML` or `.remove()` is used to delete elements from the DOM.
- [ ] The `setTimeout` method is used to rewrite the copy button text
