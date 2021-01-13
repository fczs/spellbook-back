import { app } from '../config/Config';
import { save } from '../controllers/FileStorage';

class Logger {
  filePath: string;

  constructor(logName: string = 'spellbook') {
    this.filePath = app.logs + logName + '.log';
  }

  public log(level: LogLevel, message: string): void {
    let date = new Date();
    let entryDate = `${date.getFullYear}-${date.getMonth}-${date.getDate} ${date.getHours}:${date.getMinutes}:${date.getSeconds}`;

    save(this.filePath, `${entryDate} => ${level}: ${message}`);
  }

  public info(message: string): void {
    this.log(LogLevel.info, message);
  }

  public notice(message: string): void {
    this.log(LogLevel.notice, message);
  }

  public warning(message: string): void {
    this.log(LogLevel.warning, message);
  }

  public error(message: string): void {
    this.log(LogLevel.error, message);
  }
}

export default Logger;
