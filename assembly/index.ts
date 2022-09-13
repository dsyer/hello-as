import { Buffer, callback, malloc, free } from "./runtime";
import { SpringMessage } from "./message";
import { Reader, Writer, Protobuf } from "as-proto/assembly/index";

export { malloc, free, callback };

export function call(output: Buffer, input: Buffer): void {
  var buffer = changetype<ArrayBuffer>(input.data).slice(0, i32(input.len));
  var array : Uint8Array = Uint8Array.wrap(buffer);
  var message : SpringMessage = Protobuf.decode<SpringMessage>(array, (reader: Reader, len: i32) => SpringMessage.decode(reader, len));
  var result : Uint8Array = Protobuf.encode(message, (msg: SpringMessage, writer: Writer) => SpringMessage.encode(msg, writer));
  output.data = changetype<usize>(result.buffer);
  output.len = result.byteLength;
}