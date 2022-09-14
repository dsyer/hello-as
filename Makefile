
build := target/build
wasm := build/debug.wasm

ALL: $(wasm) assembly/message.ts proto/message_pb.cjs

assembly/message.ts: proto/message.proto
	mkdir -p $(build)/protoc
	protoc --proto_path=proto --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=$(build)/protoc message.proto
# This one needs to be hand edited to make it work, so we don't copy it into the source path
#	cp $(build)/protoc/* assembly

proto/message_pb.cjs: proto/message.proto
	protoc --proto_path=proto --js_out=import_style=commonjs:./proto message.proto 
	mv proto/message_pb.js proto/message_pb.cjs

$(wasm): assembly/*.ts
	npm run asbuild

clean:
	rm -rf $(build)
