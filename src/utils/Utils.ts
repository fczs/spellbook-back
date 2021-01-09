function error(message: string): void {
  throw new Error(`\x1b[31mERR>>>\x1b[0m ${message}`);
}

export { error };
