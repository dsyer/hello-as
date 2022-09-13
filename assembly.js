import fs from "fs";
await import('module').then(module => globalThis.require = module.createRequire(import.meta.url));
var message = require('./proto/message_pb.cjs');

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
	value.payload ||= "Hello";
	value.headers ||= {};
	if (typeof(value.payload) === "string") {
		value.payload = new TextEncoder().encode(value.payload);
	}
	var msg = new message.SpringMessage();
	msg.setPayload(value.payload);
	for (var key in value.headers) {
		msg.getHeadersMap().set(key, value.headers[key]);
	}
	var encoded = msg.serializeBinary();
	const bytes = malloc(encoded.length);
	new Uint8Array(memory.buffer).set(encoded, bytes);
	const output = malloc(8);
	const input = malloc(8);
	new Uint32Array(memory.buffer, input, 2).set([bytes, encoded.length]);
	wasm.instance.exports.call(output, input);
	var buffer = new Uint32Array(memory.buffer, output, 2).slice();
	var result = message.SpringMessage.deserializeBinary(new Uint8Array(memory.buffer, buffer[0], buffer[1]));
	free(output);
	free(input);
	var converted = {payload: new TextDecoder().decode(result.getPayload())};
	result.getHeadersMap().forEach((v,k) => {
		converted.headers ||= {};
		converted.headers[k] = v;
	});
	return converted;
};

export { wasm };