export function error(message: string): void {
  throw new Error(`\x1b[31mERR >>>\x1b[0m ${message}`);
}

export function checkJson(str: string): boolean {
  return /^[\],:{}\s]*$/.test(
    str
      .replace(/\\["\\\/bfnrtu]/g, '@')
      .replace(
        /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        ']'
      )
      .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
  );
}
