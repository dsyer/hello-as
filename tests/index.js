import assert from "assert";
import { call } from "../assembly.js";
var result = await call({payload: "Hello", "headers": {"foo": "bar", "spam": "bucket"}});
assert.strictEqual(result.payload, "Hello");
assert.strictEqual(result.headers["one"], "two");
assert.strictEqual(result.headers["foo"], "bar");
console.log("ok");
