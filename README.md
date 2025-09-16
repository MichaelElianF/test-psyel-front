technical test: front-end calling and consuming a given API, build with Vue3/Typscript.

Deployed here: https://tangerine-concha-c98318.netlify.app/

## Local development

In local env you need a proxy-server,

- clone this repo `git clone https://github.com/MichaelElianF/ulb-proxy-server`

- install dependencies `npm i`

- then start the server `npm run start`

you can now start the Vite front app:

- `npm i`
- `npm run dev`

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
