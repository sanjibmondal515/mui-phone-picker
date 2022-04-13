import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import serve from "rollup-plugin-serve";
import replace from "@rollup/plugin-replace";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

export default {
  input: "src/example/Index.tsx",
  output: {
    file: "public/index.js",
    format: "iife",
  },
  plugins: [
    json(),
    replace({
      preventAssignment: true,
      "process.browser": true,
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    // // peerDepsExternal(),
    // resolve(),
    // commonjs(),
    // typescript({ tsconfig: "./tsconfig.json" }),
    postcss({
      plugins: [],
    }),
    terser(),
    resolve(),
    commonjs(),
    typescript(),
    html(),
    serve("public"),
  ],
};
