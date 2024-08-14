import terser from "@rollup/plugin-terser"
import typescript from "@rollup/plugin-typescript"
import {defineConfig} from "rollup"

export default defineConfig({
  plugins: [typescript({compilerOptions: {sourceMap: true}}), terser()],
  external: (lib) => lib.startsWith("node:"),
  input: "main.ts",
  output: {file: "main.js", format: "esm", sourcemap: true},
})
