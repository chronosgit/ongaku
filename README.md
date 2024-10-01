# Ongaku - web music player

## Manual

1. Pull the project.
2. Run `npm install` to install packages.
3. Run `npm run dev` to launch the project in the development mode.
4. OR, run `npm run build` to build the project in the production mode.

## Architecture

The folder structure is my opinionated mix of classic Nuxt3 structure and atomic design principles. `pages` folder is left for file-based routing, while the root-level `components` folder contains `atoms`, `molecules`, and `organisms` folders.

For further reference: [atomic design methodology docs](https://atomicdesign.bradfrost.com/chapter-2/) and [Nuxt3 folder structure](https://nuxt.com/docs/guide/directory-structure/nuxt).
