// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v0.4.0
//   protoc        v3.19.4

import { Writer, Reader } from "as-proto/assembly/index";

export class SpringMessage {
  static encode(message: SpringMessage, writer: Writer): void {
    writer.uint32(10);
    writer.bytes(message.payload);

    const headers = message.headers;
    for (let i = 0; i < headers.length; ++i) {
      writer.uint32(18);
      writer.fork();
      SpringMessage.HeadersEntry.encode(headers[i], writer);
      writer.ldelim();
    }
  }

  static decode(reader: Reader, length: i32): SpringMessage {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new SpringMessage();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = reader.bytes();
          break;

        case 2:
          message.headers.push(
            SpringMessage.HeadersEntry.decode(reader, reader.uint32())
          );
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  payload: Uint8Array;
  headers: Array<SpringMessage.HeadersEntry>;

  constructor(
    payload: Uint8Array = new Uint8Array(0),
    headers: Array<SpringMessage.HeadersEntry> = []
  ) {
    this.payload = payload;
    this.headers = headers;
  }
}

export namespace SpringMessage {
  export class HeadersEntry {
    key: string = "";
    value: string = "";
    static decode(reader: Reader, length: i32): HeadersEntry {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const entry = new HeadersEntry();
  
      while (reader.ptr < end) {
        const tag = reader.uint32();
        entry.key = reader.string();
        entry.value = reader.string();
      }
  
      return entry;
    }
    static encode(entry: HeadersEntry, writer: Writer): void {
      writer.uint32(10);
      writer.string(entry.key);
      writer.string(entry.value);
    }
  }
}
