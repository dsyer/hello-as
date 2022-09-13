```
$ npm run asbuild
$ node
> var is = await import("./assembly.js")
> await is.call({"payload":"Hello"})
{ payload: 'Hello', headers: { one: 'two' } }
```

To explore the memory allocation:

```javascript
> let { malloc, free, memory } = is.wasm.instance.exports
> var offset = malloc(5)
> new Uint8Array(memory.buffer, offset).set(new TextEncoder().encode("World"))
> new Uint8Array(memory.buffer, offset-4)
Uint8Array(1027396) [
   12,   0,   0,   0,  87, 111, 114, 108, 100, 0,  0, 0,
    0,   0,   0,   0,   0,   0,   0,   0,   0, 0,  0, 0,
    0,   0,   0,   0,
  ... 1027296 more items
]
```

The `offset` from `malloc()` is a pointer to the data, but AssemblyScript always reserves 4 bytes before that for the length of the allocated region. It allocates a minimum of 12 bytes (hence the `[12, 0, 0, 0]` at the beginning), and everything is aligned to 16 byte blocks. After the first 12 bytes, allocations come in increments of 16, so `malloc(13)` would allocate `12 + 16 = 28` bytes, occupying 32 bytes altogether including the header. Strings are encoded in UTF-16 by default, so 2 bytes per char, so the above is actually not a valid AssemblyScript string, and it would have to be unpacked manually, taking into account that the length of the buffer is not the length of the string.