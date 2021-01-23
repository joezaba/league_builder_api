import Database from "../core/Database";
import Logger from "../core/Logger";
import Migration from "../core/Migration";

export default new class AccountLevelsMigration extends Migration {
    
    up(): string {
        return `
            CREATE TABLE IF NOT EXISTS account_levels (
                account_level VARCHAR(255) NOT NULL PRIMARY KEY,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) default charset utf8 ENGINE = INNODB;
        `
    }
    
    down(): string {
        return `DROP TABLE IF EXISTS account_levels;`
    }

    async after(){
        try {
            let defaultAL = [['DEFAULT']];
            return await Database.query('INSERT IGNORE INTO account_levels (account_level) VALUES ?', [defaultAL]);
        } catch (error) {
            Logger.error({ message: 'could not insert DEFAULT into account_levels', class: 'core/Migrations', error: error });
            return false;
        }
    }
    
}