import Database from "../core/Database";
import Logger from "../core/Logger";
import Migration from "../core/Migration";


export default new class UserRolesMigration extends Migration {
    up(): string {
        return `
        CREATE TABLE IF NOT EXISTS user_roles (
            user_role VARCHAR(255) NOT NULL PRIMARY KEY,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) default charset utf8 ENGINE = INNODB;
        `
    }

    down(): string {
        return 'DROP TABLE IF EXISTS user_roles;';
    }

    async after(){
        try {
            let defaultUR = [['ADMIN'], ['ACCOUNT_USER']];
            await Database.query('INSERT IGNORE INTO user_roles (user_role) VALUES ?', [defaultUR]);
        } catch (error) {
            Logger.error({ message: 'could not insert ADMIN & ACCOUNT_USER into user_roles', class: 'core/Migrations', error: error });
            return false;
        }
    }
    
}