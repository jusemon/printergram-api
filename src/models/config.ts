export type ServerConfig = {
  host: string;
  port: number;
  origins: ReadonlyArray<string>;
  apiVersion: number;
};

export type TelegramConfig = {
  apiId: number;
  apiHash: string;
};

export type Config = {
  env: string;
  isDevelopment: boolean;
  server: ServerConfig;
  telegram: TelegramConfig;
};
