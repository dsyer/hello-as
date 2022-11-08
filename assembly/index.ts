// @ts-ignore: decorator
@external("env", "get")
declare function get(): i32

export function echo() : i32 {
  return get();
}
