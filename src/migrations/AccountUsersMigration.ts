import Migration from "../core/Migration"


export default new class AccountUsersMigration extends Migration {
    
    up(): string {
        return `
        CREATE TABLE IF NOT EXISTS account_users (
            account_user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            account_id INT NOT NULL,
            app_user_id INT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (account_id) REFERENCES accounts (account_id) ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY (app_user_id) REFERENCES app_users (app_user_id) ON UPDATE CASCADE ON DELETE CASCADE
        ) default charset utf8 ENGINE = INNODB;
        `
    }

    down(): string {
        return 'DROP TABLE IF EXISTS account_users;';
    }

}