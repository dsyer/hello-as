```
$ npm run asbuild
$ node
> var is = await import("./assembly.js")
> await is.call({"message":"Hello"})
{ msg: 'Hello World' }
```