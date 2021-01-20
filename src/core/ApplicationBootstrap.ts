/*!
 * 
 */

import Controller from "./Controller";
import bodyParser from "body-parser";
import express from "express";
import Logger from "./Logger";
import Database from "./Database";
import ResponseObject from "../models/ResponseObject";


export default abstract class ApplicationBootstrap{
    app: express.Application;
    port: string | number;

    constructor(){
        this.befor();
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.app.use(bodyParser.json());
        this.app.use('/', express.static(__dirname + '/../../static'));
        this.attachRoutes();
        this.app.all('*',(req: express.Request, res: express.Response) => { 
            new ResponseObject(404, 'Route Not Found').response(res, req);
        });
        this.after();
    }

    befor(){}
    after(){}

    attachRoutes(){
        this.registerControllers().forEach(controller => {
            this.app.use(controller.defaultRoute(), controller.getRouter());
        })
    }

    public listen() {
        this.app.listen(this.port, async () => {
            Logger.info(`Server started on port ${this.port}`);
            await Database.authenticate();
        });
    }
    protected abstract registerMiddleware(): any;
    protected abstract registerControllers(): Array<Controller>;

}