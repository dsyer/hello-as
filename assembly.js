import fs from "fs";
import protobuf from "protobufjs";
import { v4 as uuid } from "uuid";

const root = await protobuf.load("./proto/cloudevents.proto");
const CloudEvent = root.lookupType("CloudEvent");

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
	value.data ||= "Hello";
	value.source ||= "/";
	value.type ||= "event";
	value.id ||= uuid();
	value.specVersion ||= "1.0";
	value.textData = value.data;
	delete value.data;
	value.headers ||= {};
	value.attributes ||= {};
	for (k in value.headers) {
		value.attributes[k] = {ceString: value.headers[k]};
	};
	delete value.headers;
	var msg = CloudEvent.fromObject(value);
	var encoded = new Uint8Array(Buffer.from(CloudEvent.encode(msg).finish()));
	const bytes = malloc(encoded.length);
	new Uint8Array(memory.buffer).set(encoded, bytes);
	const output = malloc(8);
	const input = malloc(8);
	new Uint32Array(memory.buffer, input, 2).set([bytes, encoded.length]);
	wasm.instance.exports.call(output, input);
	var buffer = new Uint32Array(memory.buffer, output, 2).slice();
	var result = CloudEvent.decode(new Uint8Array(memory.buffer, buffer[0], buffer[1])).toJSON();
	free(output);
	free(input);
	if (result.binaryData) {
		result.data = new TextDecoder().decode(result.binaryData);
		delete result.textData;
		delete result.binaryData;
	}
	if (result.textData) {
		result.data = result.textData;
		delete result.textData;
		delete result.binaryData;
	}
	result.headers = {};
	for (var k in result.attributes) {
		result.headers[k] = result.attributes[k].ceString;
	}
	delete result.attributes;
	return result;
};

export { wasm };