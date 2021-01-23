import Migration from "../core/Migration";


export default new class AccountsMigration extends Migration {

    up(): string {
        return `
        CREATE TABLE IF NOT EXISTS accounts (
            account_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
            account_name VARCHAR(255) UNIQUE NOT NULL,
            account_level VARCHAR(255) DEFAULT 'DEFAULT',
            is_active TINYINT(1) NOT NULL DEFAULT TRUE,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (account_level) REFERENCES account_levels (account_level) ON UPDATE CASCADE ON DELETE RESTRICT
        ) default charset utf8 ENGINE = INNODB;
        `
    }

    down(): string {
        return 'DROP TABLE IF EXISTS accounts;';
    }

}