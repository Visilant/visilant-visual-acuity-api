declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_PORT: string;
      JWT_SECRET: string;
      SYNCHRONIZE: string;
    }
  }
}

export {};
