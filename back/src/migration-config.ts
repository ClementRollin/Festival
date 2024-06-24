import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

export default new DataSource({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname+"/**/*.entity.ts"],
    migrationsRun: true,
    migrations: [__dirname+"/migrations/*.ts"]
});