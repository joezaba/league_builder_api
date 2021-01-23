import AccountController from "../controllers/AccountController";
import AccountLevelsController from "../controllers/AccountLevelsController";
import AccountLevelsMigration from "../migrations/AccountLevelsMigration";
import AccountsMigration from "../migrations/AccountsMigration";
import AccountUsersMigration from "../migrations/AccountUsersMigration";
import AppUsersMigration from "../migrations/AppUsersMigration";
import UserRolesMigration from "../migrations/UserRolesMigration";
import ApplicationBootstrap from "./ApplicationBootstrap";
import Controller from "./Controller";
import Migration from "./Migration";

export default class Application extends ApplicationBootstrap {
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
            AccountController
        ];
    }

    

}