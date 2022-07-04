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
	value ||= "Hello";
	const bytes = malloc(value.length);
	const input = malloc(8);
	new Uint8Array(memory.buffer).set(new TextEncoder().encode(value), bytes);
	new Uint32Array(memory.buffer).set([bytes, value.length], input/4);
	const output = wasm.instance.exports.call(input);
	var buffer = new Uint32Array(memory.buffer, output, 2).slice(0);
	var result = new TextDecoder().decode(new Uint8Array(memory.buffer, buffer[0], buffer[1]));
	free(output);
	free(input);
	return result;
};

export { wasm };