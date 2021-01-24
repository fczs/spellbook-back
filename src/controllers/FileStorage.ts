import { writeFileSync } from 'fs';
import { app } from '../config/Config';

export function save(filePath: string, data: string, flag: string = 'a'): void {
  writeFileSync(filePath, data, { flag: flag });
}

export function saveJson(filePath: string, data: object, flag: string = 'a'): void {
  save(filePath, JSON.stringify(data, null, 2), flag);
}

export function saveChunk(chunk: FeedChunk): void {
  saveJson((app.feed || '') + chunk.type.toLowerCase() + '.json', chunk, 'a');
}
