/*!
 * Copyright (c) Joe Zaba, 2021. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 */

import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import Database from "./Database";
import Logger from "./Logger";

export default abstract class Repostitory {

    readonly TABLE_NAME: null | string;

    constructor() {
        this.TABLE_NAME = this.tableName();
    }

    abstract tableName(): string;

    protected parseResults(results: [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]]) {
        return JSON.parse(JSON.stringify(results))[0]
    }

    protected async selectAll() {
        try {
            const results = await Database.query(`Select * FROM ${this.TABLE_NAME}`);
            return this.parseResults(results);
        } catch (error) {
            if (error.code === 'ECONNREFUSED') {
                Logger.error({ message: 'SQL error occured while getting data', error: error.message, class: 'Repository' })
                throw error;
            } else if (error.code === 'ER_NO_SUCH_TABLE') {
                Logger.error({ message: `The table '${this.TABLE_NAME}' does not exist.`, error: error.message, class: 'Repository' })
                throw error;
            } else {
                Logger.warn({ message: error.code + ' Error occured while getting data', error: error.message, class: 'Repository' })
                throw error;
            }
        }
    }

    protected async insertOne(rows: Array<string>, values: Array<string>) {
        let rowsStr = '';
        rows.forEach((row, i) => {
            rowsStr += row;
            if (i < rows.length - 1) {
                rowsStr += ', ';
            }
        })
        const sql = `INSERT INTO ${this.TABLE_NAME} ( ${rowsStr} ) VALUES ?`
        const results = await Database.query(sql, [[values]]);
        return this.parseResults(results).insertId;
    }

    protected async selectOneWhere(key: string, value: string | number) {
        try {
            const results = await Database.query(`SELECT * FROM ${this.TABLE_NAME} WHERE ${key} = '${value}' LIMIT 1`);
            const data = await this.parseResults(results);
            return data[0];
        } catch (error) {
            Logger.error({ message: error.code + error.message, error: error, })
            throw error;
        }
    }

    protected async deleteWhere(row: string, value: string | number) {
        await Database.query(`DELETE FROM ${this.TABLE_NAME} WHERE ${row} = '${value}'`);
        return true;
    }

    async updateWhere(rows: Array<string>, values: Array<string>, key: string, keyVal: string | number) {
        let valStr = '';
        rows.forEach((row, i) => {
            valStr += ` ${row} = '${values[i]}'`;
            if (i < rows.length - 1) {
                valStr += ', ';
            }
        })
        const sql = `UPDATE ${this.TABLE_NAME} SET ${valStr} WHERE ${key} = ${keyVal};`;
        await Database.query(sql);
    }

}