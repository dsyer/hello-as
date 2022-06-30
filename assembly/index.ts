@external("env", "console.log")
declare function print(s: String): void

export function main(it: String): void {
  print(it);
}
