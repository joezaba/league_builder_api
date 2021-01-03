import Database from "../core/Database";
import Logger from "../core/Logger";
import Repostitory from "../core/Repository";
import SqlException from "../exceptions/SqlException";
import AccountLevel from "../models/AccountLevel";


export default new class AccountLevelRepository extends Repostitory {


    public async findAll() {
        await Database.connect()
        try {
            let results = await Database.query("Select * FROM account_levels");
            let data = this.parseResults(results);
            return await data.map((obj: any) => this.jsonToAccountLevel(obj));
        } catch (error) {
            Logger.warn({ message: 'SQL error occured while getting data', error: error.message, class: 'AccountLevelsRepository' })
            throw new SqlException('SQL error occured while getting data from account_levels');
        }

    }

    public async findByAccountLevel(al: string) {
        await Database.connect();
        try {
            let results = await Database
                .query(`SELECT * FROM account_levels WHERE account_level = '${al}'`);
            let data = await this.parseResults(results);
            return this.jsonToAccountLevel(data[0]);
        } catch (error) {
            Logger.warn({ message: `Cannot get AccountLevel ${al}`, error: error, class: 'AccountLevelsRepository' })
        }
    }

    public async create(al: AccountLevel) {
        await Database.connect();
        const values = [[al.accountLevel]];
        try {
            await Database.query('INSERT INTO account_levels ( account_level ) VALUES ?', [values]);
            let accl = await this.findByAccountLevel(al.accountLevel);
            return accl;
        } catch (error) {
            Logger.error({ message: `Cannot create AccountLevel ${al.accountLevel} TODO: NEED TO DIF BETWEEN SERVER AND CLIENT ERROR`, error: error, class: 'AccountLevelsRepository' });
            throw new SqlException('SQL error occured while getting data from account_levels');
        }
    }

    public async delete(al: AccountLevel) {
        await Database.connect();
        try {
            await Database.query(`DELETE FROM account_levels WHERE account_level = '${al.accountLevel}'`);
        } catch (error) {
            Logger.error({ message: `Could not delete AccountLevel ${al.accountLevel} TODO: NEED TO DIF BETWEEN SERVER AND CLIENT ERROR`, error: error, class: 'AccountLevelsRepository' });
            throw new SqlException('SQL error occured while getting data from account_levels');
        }

    }

    private jsonToAccountLevel(obj: any): AccountLevel {
        let output = new AccountLevel;

        if (obj.account_level) {
            output.accountLevel = obj.account_level;
        }
        if (obj.created_at) {
            output.createdAt = obj.created_at;
        }
        if (obj.updated_at) {
            output.updatedAt = obj.updated_at;
        }

        return output;
    }
}

