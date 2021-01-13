declare enum LogLevel {
  info = 'INFO',
  notice = 'NOTICE',
  warning = 'WARNING',
  error = 'ERROR'
}

type StringObject = {
  [index: string]: string;
};

type MixedObject = {
  [index: string]: string | number;
}

type EnvObject = {
  [index: string]: string | undefined;
};
