import mysql from 'mysql2';
import DBConnectionException from '../exceptions/DBConnectionException';
import Logger from './Logger';

export default new class Database {

    public dbConfig() {
        return {
            host: process.env.HOSTNAME || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "database",
            port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
        }

    }

    public async authenticate() {
        try {
            await this.getConnection().promise().connect();
            Logger.info("Successfully connected to MySql Database.")
            return true;
        } catch (err) { 
            Logger.error({ message: "Unable to connect to MySql Database.", class: "Database", error: err });
            return false; 
        }
    }

    public getConnection(): mysql.Connection {
        if(process.env.DATABASE_URL){
         return mysql.createConnection(process.env.DATABASE_URL);
        }
        return mysql.createConnection(this.dbConfig()); 
    }

    public async connect() {
        try {
            return await this.getConnection().promise().connect();
        } catch (error) {
            Logger.error({ message: 'Unable to connect to MySql Database.', error: error.message, class: 'AccountLevelsRepository' })
            throw new DBConnectionException('Unable to connect to MySql Database.');
        }
    }

    public async end() {
        await this.getConnection().promise().end();
    }

    public async query(sql: string, values?: any) {
        if(values){
            return await this.getConnection().promise().query(sql, values);
        } else {
            return await this.getConnection().promise().execute(sql);
        }
    }
}
