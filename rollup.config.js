import dts from 'rollup-plugin-dts'
import { readFileSync } from 'fs'
import scss from 'rollup-plugin-scss'

const pkg = JSON.parse(readFileSync('./package.json'))

export default [
  // build types
  {
    input: './types/index.d.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()],
  },
  // build themes
  {
    input: './src/lib/themes/material/index.js',
    output: {
      file: './lib/themes/material/index.js',
      format: 'esm',
      // Removes the hash from the asset filename
      assetFileNames: '[name][extname]',
    },
    plugins: [
      scss({
        name: 'index.css',
      }),
    ],
  },
]
