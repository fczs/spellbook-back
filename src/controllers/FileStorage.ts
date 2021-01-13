import { writeFileSync } from 'fs';

export function save(filePath: string, data: string): void {
  writeFileSync(filePath, data, { flag: 'a+' });
}

export function saveJson(filePath: string, data: object): void {
  save(filePath, JSON.stringify(data, null, 2));
}
