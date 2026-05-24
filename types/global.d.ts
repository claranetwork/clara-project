declare global {
  interface Array<T> {
    toArray: (text: string) => string[];
  }
}

export {};
