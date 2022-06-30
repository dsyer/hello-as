@external("env", "console.log")
declare function print(s: (i: i32) => i32): void

function increment(input: i32): i32 {
  return input + 1;
}

function callback(fn: (input: i32) => i32, input: i32): i32 {
  return fn(input);
}

export function call(input: i32): i32 {
  print(increment);
  return callback(increment, input);
}
