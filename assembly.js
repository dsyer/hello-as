import fs from "fs";
import * as msgpack from '@msgpack/msgpack';

const callback = (output, fn, input) => {
	wasm.instance.exports.callback(output, fn, input);
}

const get = (output, fn, input) => {
	callback(output, fn, input);
}

const file = fs.readFileSync('./build/debug.wasm');
let wasm = await WebAssembly.instantiate(file, { "env": { "console.log": console.log, "abort": () => {console.log("Aborted")} } });
let { malloc, free, memory } = wasm.instance.exports;

export async function call(value) {
	value ||= {}
	value.message ||= "Hello";
	var msg = msgpack.encode(value);
	const bytes = malloc(msg.length);
	new Uint8Array(memory.buffer).set(msg, bytes);
	const output = malloc(8);
	wasm.instance.exports.call(output, bytes, msg.length);
	var buffer = new Uint32Array(memory.buffer, output, 2).slice(0);
	var result = msgpack.decode(new Uint8Array(memory.buffer, buffer[0], buffer[1]));
	free(output);
	return result;
};

export { wasm };