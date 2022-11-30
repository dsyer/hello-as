
build := target/build
wasm := build/debug.wasm

ALL: $(wasm) assembly/message.ts assembly/cloudevents.ts proto/message_pb.cjs

assembly/message.ts: proto/message.proto
	mkdir -p $(build)/protoc
	protoc --proto_path=proto --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=$(build)/protoc message.proto
	cp $(build)/protoc/message.ts assembly

assembly/cloudevents.ts: proto/cloudevents.proto
	mkdir -p $(build)/protoc
	protoc --proto_path=proto --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=$(build)/protoc cloudevents.proto
	cp $(build)/protoc/cloudevents.ts assembly

# https://github.com/protocolbuffers/protobuf-javascript/issues/127
# proto/message_pb.cjs: proto/message.proto
#	protoc --proto_path=proto --js_out=import_style=commonjs:./proto message.proto 
#	mv proto/message_pb.js proto/message_pb.cjs

$(wasm): assembly/*.ts
	npm run asbuild

clean:
	rm -rf $(build)
