import AccountLevelsController from "../controllers/AccountLevelsController";
import ApplicationBootstrap from "./ApplicationBootstrap";
import Controller from "./Controller";

export default class Application extends ApplicationBootstrap {

    constructor(){
        super()
    }

    protected registerMiddleware(): any {
        
    }

    protected registerControllers(): Array<Controller>{
        return [AccountLevelsController];
    }


}