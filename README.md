# unplugin-eslint

[![NPM version](https://img.shields.io/npm/v/unplugin-eslint?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-eslint)

🍣 A universal bundler plugin to lint entry points and all imported files with ESLint.

## Template Usage

To use this template, clone it down using:

```bash
npx degit unplugin/unplugin-eslint my-unplugin
```

And do a global replacement of `unplugin-eslint` with your plugin name.

Then you can start developing your unplugin 🔥

To test your plugin, run: `pnpm run dev`
To release a new version, run: `pnpm run release`

## Install

```bash
npm i --save-dev unplugin-eslint
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import UnpluginEslint from 'unplugin-eslint/vite'

export default defineConfig({
  plugins: [
    UnpluginEslint({
      /* options */
    }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import UnpluginEslint from 'unplugin-eslint/rollup'

export default {
  plugins: [
    UnpluginEslint({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-eslint/webpack')({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    [
      'unplugin-eslint/nuxt',
      {
        /* options */
      },
    ],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-eslint/webpack')({
        /* options */
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import UnpluginEslint from 'unplugin-eslint/esbuild'

build({
  plugins: [UnpluginEslint()],
})
```

<br></details>

## Usage

### Options

For all options please refer to [docs](https://github.com/rollup/plugins/tree/master/packages/eslint#options).

This plugin accepts all [@rollup/plugin-eslint](https://github.com/rollup/plugins/tree/master/packages/eslint#options) options.
