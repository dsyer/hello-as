import * as msgpack from '@wapc/as-msgpack/assembly/index';
import { Buffer, malloc, free } from './runtime';

export { malloc, free };

class Message {
  msg: string | null;
}

function loadMessage(input: Buffer): Message {
  var result = new Uint8Array(i32(input.len));
  for (var i = 0; i < i32(input.len); i++) {
    result[i] = load<u8>(input.data + i);
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

function storeMessage(output: Buffer, value: Message): void {
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

function greet(output: Buffer, input: Buffer): void {
  var value = loadMessage(input);
  var result = new Message();
  result.msg = value.msg! + " World";
  storeMessage(output, result);
}

export function callback(output: Buffer, fn: i32, input: Buffer): void {
  call_indirect(fn, output, input);
}

export function call(output: Buffer, data: usize, len: usize): void {
  var input = new Buffer();
  input.data = data;
  input.len = len;
  callback(output, greet.index, input);
}
