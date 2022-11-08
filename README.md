```
$ npm run asbuild
$ node
> var is = await import("./assembly.js")
> is.echo()
1234
```

To explore the memory allocation:

```javascript
> let { memory } = is.wasm.instance.exports
> var offset = 10;
> new Uint8Array(memory.buffer, offset).set(new TextEncoder().encode("World"))
> new Uint8Array(memory.buffer, offset-4)
Uint8Array(1027396) [
   12,   0,   0,   0,  87, 111, 114, 108, 100, 0,  0, 0,
    0,   0,   0,   0,   0,   0,   0,   0,   0, 0,  0, 0,
    0,   0,   0,   0,
  ... 1027296 more items
]
```
