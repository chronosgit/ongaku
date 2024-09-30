# Ongaku - web music player

## Manual

1. Pull the project.
2. Run `npm install` to install packages.
3. Run `npm run dev` to launch the project in the development mode.
4. OR, run `npm run build` to build the project in the production mode.

## Architecture

The application architecture is a weird, opinionated mix of default Nuxt3 and FSD (Feature Sliced Design) architectures.

For reference: Nuxt3 directory structures and the FSD.

I did my best to leverage the organizational benefits that both bring, which consequently resulted in the following architecture:

- .nuxt
- assets
- components
  - app
  - processes
  - widgets
  - features
  - entities
  - shared
- composables
- content
- layouts
- middleware
- pages
- plugins
- public
- server
- store
- utils

Additionally, the auto-import feature for the `components` folder has been disabled for better clarity.

P.S. The architecture may change.
