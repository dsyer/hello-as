@external("spectest", "print")
declare function print(s: i32): void

function main(): void {
  print(1);
  print(2);
  print(3);
}

main();