import * as msgpack from "@wapc/as-msgpack/assembly/index";

export function malloc(size: usize): usize {
  return heap.alloc(size);
}

export function free(ptr: usize): void {
  heap.free(ptr);
}

@unmanaged
export class Buffer {
  constructor() {}
  data: usize;
  len: usize;
}

export function callback(output: Buffer, fn: i32, input: Buffer): void {
  call_indirect(fn, output, input);  
}  

export function pack<T>(
  output: Buffer,
  value: T,
  encode: (val: T, writer: msgpack.Writer) => void
): void {
  const sizer = new msgpack.Sizer();
  encode(value, sizer);
  var bytes = new Uint8Array(sizer.length);
  encode(value, new msgpack.Encoder(bytes.buffer));
  output.data = malloc(bytes.byteLength);
  output.len = bytes.byteLength;
  for (var i = 0; i < bytes.byteLength; i++) {
    store<u8>(output.data + i, bytes[i]);
  }
}

export function unpack<T>(
  input: Buffer,
  decode: (decoder: msgpack.Decoder) => T
): T {
  var result = new Uint8Array(i32(input.len));
  for (var i = 0; i < i32(input.len); i++) {
    result[i] = load<u8>(input.data + i);
  }
  var decoder = new msgpack.Decoder(result.buffer);
  return decode(decoder);
}
