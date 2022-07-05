import assert from "assert";
import { call } from "../assembly.js";
var result = await call({message: "Hello"});
assert.strictEqual(result.msg, "Hello World");
console.log("ok");
