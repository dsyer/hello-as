import { Buffer, callback, malloc, free } from "./runtime";
import { io } from "./cloudevents";
import { Reader, Writer, Protobuf } from "as-proto/assembly/index";

// import CloudEvent = io.cloudevents.v1.CloudEvent;
// import CloudEventAttributeValue = io.cloudevents.v1.CloudEvent.CloudEventAttributeValue;

export { malloc, free, callback };

export function call(output: Buffer, input: Buffer): void {
  var array : Uint8Array = Uint8Array.wrap(changetype<ArrayBuffer>(input.data).slice(0, i32(input.len)));
  var message : io.cloudevents.v1.CloudEvent = Protobuf.decode<io.cloudevents.v1.CloudEvent>(array, (reader: Reader, len: i32) => io.cloudevents.v1.CloudEvent.decode(reader, len));
  message.attributes.set("one", new io.cloudevents.v1.CloudEvent.CloudEventAttributeValue(false,0,"two"));
  var result : ArrayBuffer = Protobuf.encode<io.cloudevents.v1.CloudEvent>(message, (msg: io.cloudevents.v1.CloudEvent, writer: Writer) => io.cloudevents.v1.CloudEvent.encode(msg, writer)).buffer;
  output.data = changetype<usize>(result) + offsetof<Buffer>("data");
  output.len = result.byteLength;
}