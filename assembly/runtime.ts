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
  private pack(output: Buffer, value: O): void {
    const sizer = new Sizer();
    this.fun.encode(value, sizer);
    var bytes = new Uint8Array(sizer.length).buffer;
    this.fun.encode(value, new Encoder(bytes));
    output.data = changetype<usize>(bytes) + offsetof<Buffer>("data");
    output.len = bytes.byteLength;
  }
  private unpack(input: Buffer): I {
    var result = changetype<ArrayBuffer>(input.data).slice(0, i32(input.len));
    var decoder = new Decoder(result);
    return this.fun.decode(decoder);
  }
}

export function callback(output: Buffer, fn: i32, input: Buffer): void {
  call_indirect(fn, output, input);
}
