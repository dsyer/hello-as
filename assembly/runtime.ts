import {
  Encoder,
  Decoder,
  Writer,
  Sizer,
} from "@wapc/as-msgpack/assembly/index";

export { Decoder, Writer };

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

export interface Function<I, O> {
  apply(input: I): O;
  encode(output: O, writer: Writer): void;
  decode(decoder: Decoder): I;
}

export class Caller<I, O> {
  constructor(fun: Function<I, O>) {
    this.fun = fun;
  }
  private fun: Function<I, O>;
  public call(output: Buffer, input: Buffer): void {
    var value = this.unpack(input);
    var result = this.fun.apply(value);
    this.pack(output, result);
  }
  private pack(
    output: Buffer,
    value: O
  ): void {
    const sizer = new Sizer();
    this.fun.encode(value, sizer);
    var bytes = new Uint8Array(sizer.length);
    this.fun.encode(value, new Encoder(bytes.buffer));
    output.data = malloc(bytes.byteLength);
    output.len = bytes.byteLength;
    for (var i = 0; i < bytes.byteLength; i++) {
      store<u8>(output.data + i, bytes[i]);
    }
  }
  private unpack(input: Buffer): I {
    var result = new Uint8Array(i32(input.len));
    for (var i = 0; i < i32(input.len); i++) {
      result[i] = load<u8>(input.data + i);
    }
    var decoder = new Decoder(result.buffer);
    return this.fun.decode(decoder);
  }
}

export function callback(output: Buffer, fn: i32, input: Buffer): void {
  call_indirect(fn, output, input);
}
