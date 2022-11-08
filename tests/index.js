import assert from "assert";
import { echo } from "../assembly.js";
var result = echo();
assert.strictEqual(result, 1234);
console.log("ok");
