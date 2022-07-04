import * as msgpack from '@wapc/as-msgpack/assembly/index';

@external("env", "console.log")
declare function print(s: i32): void

@unmanaged
class Buffer {
  constructor() {}
  data: usize
  len: usize
}

class Message {
  msg: String | null;
}

export function malloc(size: usize): usize {
  return heap.alloc(size);
}

export function free(ptr: usize) : void {
  heap.free(ptr);
}

function loadMessage(ptr: usize, len: usize): Message {
  var result = new Uint8Array(len);
  for (var i: usize = 0; i < len; i++) {
    result[i] = load<u8>(ptr + i);
  }
  var decoder = new msgpack.Decoder(result.buffer);
  var msg = new Message();
  decoder.readMapSize();
  decoder.readString();
  var value = decoder.readString();  
  msg.msg = value;
  return msg;
}

function encode(value: Message, writer: msgpack.Writer) : void {
  writer.writeMapSize(1);
  writer.writeString("msg");
  writer.writeString(value.msg!);
}

function storeMessage(value: Message): Buffer {
  var output = new Buffer();
  const sizer = new msgpack.Sizer();
  encode(value, sizer);
  var bytes = new Uint8Array(sizer.length);
  encode(value, new msgpack.Encoder(bytes.buffer));
  output.data = malloc(bytes.byteLength);
  output.len = bytes.byteLength;
  for (var i = 0; i < bytes.byteLength; i++) {
    store<u8>(output.data + i, bytes[i]);
  }
  return output;
}

function greet(input: Buffer): Buffer {
  var value = loadMessage(input.data, input.len);
  var result = new Message();
  result.msg = value.msg! + " World";
  var output = storeMessage(result);
  return output;
}

export function callback(fn: i32, input: Buffer): Buffer {
  return call_indirect(fn, input);
}

export function call(input: Buffer): Buffer {
  return callback(greet.index, input);
}
