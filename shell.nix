with import <nixpkgs> {
  overlays = [
    (self: super: {
      # https://github.com/NixOS/nixpkgs/pull/188162
      binaryen = super.binaryen.override { nodejs = super.nodejs-14_x; };
    })
  ];
}; mkShell {

  name = "env";
  buildInputs = [
    figlet emscripten nodejs cmake check wasmtime wabt binaryen
  ];

  shellHook = ''
    mkdir -p ~/.emscripten
    chmod +w -R ~/.emscripten
    cp -rf ${emscripten}/share/emscripten/cache ~/.emscripten
    export EM_CACHE=~/.emscripten/cache
    figlet -- '-:hello-as:-'
  '';

}