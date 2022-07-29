import fs from "fs";
import * as msgpack from '@msgpack/msgpack';

const callback = (output, fn, input) => {
	console.log("get:", new Uint32Array(memory.buffer, output, 2).slice(0));
	console.log("get:", new Uint32Array(memory.buffer, input, 2).slice(0));
	wasm.instance.exports.callback(output, fn, input);
	console.log("get:", new Uint32Array(memory.buffer, output, 2).slice(0));
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
	const input = malloc(8);
	new Uint32Array(memory.buffer, input, 2).set([bytes, msg.length]);
	wasm.instance.exports.call(output, input);
	var buffer = new Uint32Array(memory.buffer, output, 2).slice();
	var result = msgpack.decode(new Uint8Array(memory.buffer, buffer[0], buffer[1]));
	free(output);
	free(input);
	return result;
};

export { wasm };