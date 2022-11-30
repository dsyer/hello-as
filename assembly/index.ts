import { Buffer, callback, malloc, free } from "./runtime";
import { SpringMessage } from "./message";
import { Reader, Writer, Protobuf } from "as-proto/assembly/index";

export { malloc, free, callback };

export function call(output: Buffer, input: Buffer): void {
  var array : Uint8Array = Uint8Array.wrap(changetype<ArrayBuffer>(input.data).slice(0, i32(input.len)));
  var message : SpringMessage = Protobuf.decode<SpringMessage>(array, (reader: Reader, len: i32) => SpringMessage.decode(reader, len));
  message.headers.set("one", "two");
  var result : ArrayBuffer = Protobuf.encode<SpringMessage>(message, (msg: SpringMessage, writer: Writer) => SpringMessage.encode(msg, writer)).buffer;
  output.data = changetype<usize>(result) + offsetof<Buffer>("data");
  output.len = result.byteLength;
}