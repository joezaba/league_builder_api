import Database from "./Database"
import Logger from "./Logger";


export const migrateUp = async () => {
    Database.connect();

    // create account_level Table
    try {
        await Database.query(`
            CREATE TABLE IF NOT EXISTS account_levels (
                account_level VARCHAR(255) NOT NULL PRIMARY KEY,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) default charset utf8 ENGINE = INNODB;
    `); 
    } catch (error) {
        Logger.error({ message: 'could not create account_levels', class: 'core/Migrations', error: error });
        return false;
    }

    // Insert Default value for Account Level
    try {
        let defaultAL = [['DEFAULT']];
        await Database.query('INSERT IGNORE INTO account_levels (account_level) VALUES ?', [defaultAL]);
    } catch (error) {
        Logger.error({ message: 'could not insert DEFAULT into account_levels', class: 'core/Migrations', error: error });
        return false;
    }

    // create account Table
    try {
        await Database.query(`
            CREATE TABLE IF NOT EXISTS accounts (
                account_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                account_name VARCHAR(255) UNIQUE NOT NULL,
                account_level VARCHAR(255) DEFAULT 'DEFAULT',
                is_active TINYINT(1) NOT NULL DEFAULT TRUE,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (account_level) REFERENCES account_levels (account_level) ON UPDATE CASCADE ON DELETE RESTRICT
            ) default charset utf8 ENGINE = INNODB;
    `); 
    } catch (error) {
        Logger.error({ message: 'could not create accounts', class: 'core/Migrations', error: error });
        return false;
    }

    // create user_roles Table
    try {
        await Database.query(`
            CREATE TABLE IF NOT EXISTS user_roles (
                user_role VARCHAR(255) NOT NULL PRIMARY KEY,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                ) default charset utf8 ENGINE = INNODB;
    `); 
    } catch (error) {
        Logger.error({ message: 'could not create user_roles', class: 'core/Migrations', error: error });
        return false;
    }

    // Insert Default value for Account Level
    try {
        let defaultUR = [['ADMIN'],['ACCOUNT_USER']];
        await Database.query('INSERT IGNORE INTO user_roles (user_role) VALUES ?', [defaultUR]);
    } catch (error) {
        Logger.error({ message: 'could not insert ADMIN & ACCOUNT_USER into user_roles', class: 'core/Migrations', error: error });
        return false;
    }

    // create app_users Table
    try {
        await Database.query(`
            CREATE TABLE IF NOT EXISTS app_users (
                app_user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) UNIQUE NOT NULL,
                secret VARCHAR(255) UNIQUE NOT NULL,
                user_role VARCHAR(255) NOT NULL DEFAULT 'ACCOUNT_USER',
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_role) REFERENCES user_roles (user_role) ON UPDATE CASCADE ON DELETE RESTRICT
            ) default charset utf8 ENGINE = INNODB;
    `); 
    } catch (error) {
        Logger.error({ message: 'could not create app_users', class: 'core/Migrations', error: error });
        return false;
    }

    // create account_users Table
    try {
        await Database.query(`
            CREATE TABLE IF NOT EXISTS account_users (
                account_user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                account_id INT NOT NULL,
                app_user_id INT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (account_id) REFERENCES accounts (account_id) ON UPDATE CASCADE ON DELETE CASCADE,
                FOREIGN KEY (app_user_id) REFERENCES app_users (app_user_id) ON UPDATE CASCADE ON DELETE CASCADE
            ) default charset utf8 ENGINE = INNODB;
    `); 
    } catch (error) {
        Logger.error({ message: 'could not create account_users', class: 'core/Migrations', error: error });
        return false;
    }

    return true;
}

export const migrateDown = async () => {
    // create account_users Table
    try {
        await Database.query('DROP TABLE IF EXISTS account_users;');
        await Database.query('DROP TABLE IF EXISTS app_users;');
        await Database.query('DROP TABLE IF EXISTS user_roles;');
        await Database.query('DROP TABLE IF EXISTS accounts;');
        await Database.query('DROP TABLE IF EXISTS account_levels;'); 
        return true;
    } catch (error) {
        Logger.error({ message: 'could not drop all tables', class: 'core/Migrations', error: error });
        return false;
    }
}

