import * as process from 'process';

export type DB_TYPE = 'mysql' | 'mariadb' | 'postgres' | 'mssql' | 'oracle';

const isTrueSet = (value: string) => value === 'true';

export interface JwtConfig {
  secret: string;
}

export const configLoader = () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT as string, 10) || 5432,
    type: process.env.DATABASE_TYPE as DB_TYPE,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: isTrueSet(process.env.SYNCHRONIZE as string),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
