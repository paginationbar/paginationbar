import dts from 'rollup-plugin-dts'
import fs from 'fs'
import path from 'path'
import scss from 'rollup-plugin-scss'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

const getThemeDirNames = (targetDirName = 'src/lib/themes') => {
  const basePath = path.join(process.cwd(), targetDirName)
  const arr = fs.readdirSync(basePath)
  const dirs = arr.filter((v) => fs.statSync(`${basePath}/${v}`).isDirectory())

  return dirs
}

const getBuildThemesConfig = () => {
  const themes = getThemeDirNames()

  return themes.map((themeName) => {
    return {
      input: `./src/lib/themes/${themeName}/index.js`,
      output: {
        file: `./lib/themes/${themeName}/index.js`,
        format: 'esm',
        // Removes the hash from the asset filename
        assetFileNames: '[name][extname]',
      },
      plugins: [
        scss({
          name: 'index.css',
        }),
      ],
    }
  })
}

export default [
  // build types
  {
    input: './types/index.d.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [dts()],
  },
  // build themes
  ...getBuildThemesConfig(),
]
