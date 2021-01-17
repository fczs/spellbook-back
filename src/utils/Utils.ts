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

export function printMatchAction(match: UMatch, action: string): void {
  let color = '';

  switch (action) {
    case 'ADDED':
      color = '32';
      break;
    case 'UPDATED':
      color = '34';
      break;
    case 'DELETED':
      color = '31';
      break;
  }

  console.log(`${match.sportType}: ${match.host} - ${match.guest} -> \x1b[${color}m${action}\x1b[0m`);
}
