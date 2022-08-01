import { Decoder, Writer, Buffer, Caller, Function, callback, malloc, free } from "./runtime";

export { malloc, free, callback };

class Message {
  msg: string | null;
}

class MessageEnhancer implements Function<Message, Message> {

  decode(decoder: Decoder): Message {
    var msg = new Message();
    decoder.readMapSize();
    decoder.readString();
    var value = decoder.readString();
    msg.msg = value;
    return msg;
  }

  encode(value: Message, writer: Writer): void {
    writer.writeMapSize(1);
    writer.writeString("msg");
    writer.writeString(value.msg!);
  }

  apply(value: Message): Message {
    var result = new Message();
    result.msg = value.msg! + " World";
    return result;
  }

}

const caller = new Caller<Message, Message>(new MessageEnhancer());

export function call(output: Buffer, input: Buffer): void {
  caller.call(output, input);
}
