@external("env", "console.log")
declare function print(s: i32): void

@unmanaged
class Buffer {
  constructor() {}
  data: usize
  len: usize
}

export function malloc(size: usize): usize {
  return heap.alloc(size);
}

export function free(ptr: usize) : void {
  heap.free(ptr);
}

function loadString(ptr: usize, len: usize): String {
  var result = "";
  for (var i: usize = 0; i < len; i++) {
    result += String.fromCharCode(load<u8>(ptr + i));
  }
  return result;
}

function storeString(ptr: usize, value: String): void {
  for (var i = 0; i < value.length; i++) {
    store<u8>(ptr + i, value.charCodeAt(i));
  }
}

function greet(input: Buffer): Buffer {
  var value: string = loadString(input.data, input.len);
  var output = new Buffer();
  var result = value + " World";
  output.data = malloc(result.length);
  output.len = result.length;
  storeString(output.data, result);
  return output;
}

export function callback(fn: i32, input: Buffer): Buffer {
  return call_indirect(fn, input);
}

export function call(input: Buffer): Buffer {
  return callback(greet.index, input);
}
