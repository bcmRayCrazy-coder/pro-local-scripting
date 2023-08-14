import typescript from 'typescript'
import { terser } from 'rollup-plugin-terser'
import typescript2 from 'rollup-plugin-typescript2'
import { readFileSync } from 'fs'

const external = Object.keys(JSON.parse((readFileSync('package.json').toString())) || '')
const globals = external.reduce((prev, current) => {
  const newPrev = prev

  newPrev[current] = current
  return newPrev
}, {})

const defaultConfig = {
  input: './src/main.ts',
  output: {
    file: './dist/main.js',
    format: 'umd',
    banner: '#!/usr/bin/env node',
    globals
  },
  external,
  plugins: [
    typescript2({
      exclude: 'node_modules/**',
      useTsconfigDeclarationDir: true,
      typescript,
      tsconfig: './tsconfig.json'
    }),
    terser()
  ]
}

export default defaultConfig