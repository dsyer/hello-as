
build := target/build
wasm := message.wasm

ALL: $(wasm) 

assembly/message.ts: message.proto
	mkdir -p $(build)/protoc
	protoc --proto_path=proto --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=$(build)/protoc message.proto
#	cp $(build)/protoc/* assembly

$(wasm): assembly/message.ts

clean:
	rm -rf $(build)
