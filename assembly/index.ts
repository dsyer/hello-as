import { Decoder, Writer } from '@wapc/as-msgpack/assembly/index';
import { Buffer, pack, unpack, callback, malloc, free } from './runtime';

export { malloc, free, callback };

class Message {
  msg: string | null;
}

function decode(decoder:  Decoder): Message {
  var msg = new Message();
  decoder.readMapSize();
  decoder.readString();
  var value = decoder.readString();  
  msg.msg = value;
  return msg;
}

function encode(value: Message, writer: Writer) : void {
  writer.writeMapSize(1);
  writer.writeString("msg");
  writer.writeString(value.msg!);
}

function greet(output: Buffer, input: Buffer): void {
  var value = unpack(input, decode);
  var result = new Message();
  result.msg = value.msg! + " World";
  pack(output, result, encode);
}

export function call(output: Buffer, input: Buffer): void {
  // Unnecessary virtual call, just to show how it works.
  callback(output, greet.index, input);
}
