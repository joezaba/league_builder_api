require('dotenv').config();
import AccountController from "./controllers/AccountController";
import AccountLevelsController from "./controllers/AccountLevelsController";
import AccountLevelsMigration from "./migrations/AccountLevelsMigration";
import AccountsMigration from "./migrations/AccountsMigration";
import AccountUsersMigration from "./migrations/AccountUsersMigration";
import AppUsersMigration from "./migrations/AppUsersMigration";
import UserRolesMigration from "./migrations/UserRolesMigration";
import Application from "./core/Application";
import Controller from "./core/Controller";
import Migration from "./core/Migration";
import UserRolesController from "./controllers/UserRolesController";

new class extends Application {

    protected registerMigrations(): Migration[] {
        return [
            AccountLevelsMigration,
            AccountsMigration,
            UserRolesMigration,
            AppUsersMigration,
            AccountUsersMigration 
        ];
    }

    protected registerMiddleware(): any {
        
    }

    protected registerControllers(): Array<Controller>{
        return [
            AccountLevelsController,
            AccountController,
            UserRolesController
        ];
    }

}



