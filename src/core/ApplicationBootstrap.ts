import Controller from "./Controller";
import bodyParser from "body-parser";
import express from "express";
import Logger from "./Logger";
import Database from "./Database";

export default abstract class ApplicationBootstrap{
    app: express.Application;
    port: string | number;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.app.use(bodyParser.json());
        this.attachRoutes();
    }

    attachRoutes(){
        this.registerControllers().forEach(controller => {
            this.app.use('/', controller.getRouter());
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            Database.authenticate();
            Logger.info(`Server started on port ${this.port}`)
        });
    }
    protected abstract registerMiddleware(): any;
    protected abstract registerControllers(): Array<Controller>;

}