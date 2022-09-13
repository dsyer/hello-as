import assert from "assert";
import { call } from "../assembly.js";
var result = await call({payload: "Hello", "headers": {"foo": "bar"}});
assert.strictEqual(result.payload, "Hello World");
console.log("ok");
