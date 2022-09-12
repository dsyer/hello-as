with import <nixpkgs> {};
mkShell {

  name = "env";
  buildInputs = [
    nodejs cmake check wasmtime wabt protobuf protobufc
  ];

  shellHook = ''
    echo '-:hello-as:-'
  '';

}