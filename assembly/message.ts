/* eslint-disable */
import * as _m0 from "protobufjs/minimal.d";

export const protobufPackage = "";

function createBaseSpringMessage(): SpringMessage {
  return { payload: new Uint8Array(0), headers: [] };
}

export class SpringMessage {
  payload: Uint8Array;
  headers: SpringMessage_HeadersEntry[];
  static encode(message: SpringMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.payload.length !== 0) {
      writer.uint32(10).bytes(message.payload);
    }
    message.headers.forEach(entry => {
      SpringMessage_HeadersEntry.encode(entry, writer.uint32(18).fork()).ldelim();
    });
    return writer;
  }

  static decode(input: Uint8Array, length?: number): SpringMessage {
    const reader = new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpringMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.payload = reader.bytes();
          break;
        case 2:
          const entry2 = SpringMessage_HeadersEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.headers.push(entry2);
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }

};

function createBaseSpringMessage_HeadersEntry(): SpringMessage_HeadersEntry {
  return { key: "", value: ""};
}

export class SpringMessage_HeadersEntry {
  key: string;
  value: string;
  static encode(message: SpringMessage_HeadersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  }

  static decode(input: Uint8Array, length?: number): SpringMessage_HeadersEntry {
    const reader = new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSpringMessage_HeadersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  }

};
