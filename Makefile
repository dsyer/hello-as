
build := target/build
wasm := build/debug.wasm

ALL: $(wasm) assembly/message.ts assembly/cloudevents.ts

assembly/message.ts: proto/message.proto
	mkdir -p $(build)/protoc
	protoc --proto_path=proto --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=$(build)/protoc message.proto
	cp $(build)/protoc/message.ts assembly

assembly/cloudevents.ts: proto/cloudevents.proto
	mkdir -p $(build)/protoc
	protoc --proto_path=proto --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=$(build)/protoc cloudevents.proto google/protobuf/any.proto google/protobuf/timestamp.proto
	cp -r $(build)/protoc/cloudevents.ts $(build)/protoc/google assembly

$(wasm): assembly/*.ts
	npm run asbuild

clean:
	rm -rf $(build)
