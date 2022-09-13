
build := target/build
wasm := message.wasm

ALL: $(wasm) 

assembly/message.ts: proto/message.proto
	mkdir -p $(build)/protoc
	protoc --proto_path=proto --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=$(build)/protoc message.proto
#	cp $(build)/protoc/* assembly

$(wasm): assembly/message.ts

clean:
	rm -rf $(build)
