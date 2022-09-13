export function malloc(size: usize): usize {
  return heap.alloc(size);
}

export function free(ptr: usize): void {
  heap.free(ptr);
}

@unmanaged
export class Buffer {
  constructor() {}
  data: usize;
  len: usize;
}

export function callback(output: Buffer, fn: i32, input: Buffer): void {
  call_indirect(fn, output, input);
}
