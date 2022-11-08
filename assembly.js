import fs from "fs";

const file = fs.readFileSync('./build/debug.wasm');
let wasm = await WebAssembly.instantiate(file, { "env": { "abort": () => {console.log("Aborted")}, "get": () => 1234} } );
let { echo } = wasm.instance.exports;

export { wasm, echo };