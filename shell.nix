with import <nixpkgs> {};
mkShell {

  name = "env";
  buildInputs = [
    nodejs cmake check wasmtime wabt
  ];

  shellHook = ''
    echo '-:hello-as:-'
  '';

}