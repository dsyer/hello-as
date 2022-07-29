export function malloc(size: usize): usize {
  return heap.alloc(size);
}

export function free(ptr: usize): void {
  heap.free(ptr);
}

@unmanaged
export class Buffer {
  constructor() {}
  data: usize
  len: usize
}