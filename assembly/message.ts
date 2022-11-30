// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v0.9.1
//   protoc        v3.21.8

import { Writer, Reader } from "as-proto/assembly";

export class SpringMessage {
  static encode(message: SpringMessage, writer: Writer): void {
    writer.uint32(10);
    writer.bytes(message.payload);

    const headers = message.headers;
    if (headers !== null) {
      const headersKeys = headers.keys();
      for (let i: i32 = 0; i < headersKeys.length; ++i) {
        const headersKey = headersKeys[i];
        writer.uint32(18);
        writer.fork();
        writer.uint32(10);
        writer.string(headersKey);
        writer.uint32(18);
        writer.string(headers.get(headersKey));
        writer.ldelim();
      }
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
          let headersKey: string = "";
          let headersValue: string = "";
          let headersHasKey: bool = false;
          let headersHasValue: bool = false;
          for (
            const end: usize = reader.ptr + reader.uint32();
            reader.ptr < end;

          ) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                headersKey = reader.string();
                headersHasKey = true;
                break;

              case 2:
                headersValue = reader.string();
                headersHasValue = true;
                break;

              default:
                reader.skipType(tag & 7);
                break;
            }
            if (message.headers === null) {
              message.headers = new Map<string, string>();
            }
            const headers = message.headers;
            if (headers !== null && headersHasKey && headersHasValue) {
              headers.set(headersKey, headersValue);
            }
          }
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  payload: Uint8Array;
  headers: Map<string, string>;

  constructor(
    payload: Uint8Array = new Uint8Array(0),
    headers: Map<string, string> = new Map()
  ) {
    this.payload = payload;
    this.headers = headers;
  }
}

export namespace SpringMessage {}
