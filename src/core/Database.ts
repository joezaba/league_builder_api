import mysql from 'mysql2/promise';
import Logger from './Logger';

export default new class Database {

    conn!: mysql.Connection;

    public dbConfig() {
        let dbUrl: string;
        if (process.env.DATABASE_URL) {
            dbUrl = process.env.DATABASE_URL;
        } else {
            const host = process.env.HOSTNAME || "localhost";
            const user = process.env.DB_USER || "root";
            const password = process.env.DB_PASSWORD || "";
            const database = process.env.DB_NAME || "database";
            const port = process.env.DB_PORT ? +process.env.DB_PORT : 3306;
            dbUrl = `mysql://${user}:${password}@${host}:${port}/${database}?`;
        }
        return dbUrl.split('?')[0]; 
    }

    public async authenticate() {
        try {
            await this.connect();
            await this.end();
            Logger.info("Successfully connected to MySql Database.");
            return true;
        } catch (err) {
            Logger.error({ message: "Unable to connect to MySql Database.", class: "Database", error: err });
            return false;
        }
    }

    public async connect() {
        this.conn = await mysql.createConnection(this.dbConfig())
    }

    public async end() {
        await this.conn.end();
    }

    public async query(sql: string, values?: any) {
        let results: any;
        await this.connect();
        if (values) {
            results = await this.conn.query(sql, values);
        } else {
            results = await this.conn.execute(sql);
        }
        await this.end();
        return results;
    }
}
