import terser from "@rollup/plugin-terser";

export default [
  {
    input: "src/main.js",
    output: {
      file: "dist/movablePoint.min.js",
      format: "iife",
      name: "movablePoints",
      plugins: [terser()],
    },
  },
  {
    input: "src/main.js",
    output: {
      file: "dist/movablePoint.esm.js",
      format: "esm",
    },
  },
];
