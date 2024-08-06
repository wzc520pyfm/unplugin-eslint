import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import UnpluginEslint from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    UnpluginEslint(),
  ],
})
