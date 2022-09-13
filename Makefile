
build := target/build
wasm := build/debug.wasm

ALL: $(wasm) 

assembly/message.ts: proto/message.proto
	mkdir -p $(build)/protoc
	protoc --proto_path=proto --plugin=protoc-gen-as=./node_modules/.bin/as-proto-gen --as_out=$(build)/protoc message.proto
	protoc --proto_path=proto --js_out=import_style=commonjs:./proto message.proto 
#	cp $(build)/protoc/* assembly

$(wasm): assembly/*.ts
	npm run asbuild

clean:
	rm -rf $(build)
