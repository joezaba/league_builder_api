import Migration from "../core/Migration";


export default new class AppUsersMigration extends Migration {
    
    up(): string {
        return `
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
        `;
    }

    down(): string {
        return 'DROP TABLE IF EXISTS app_users;';
    }
    
}