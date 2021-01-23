/*!
 * 
 */

import Controller from "./Controller";
import bodyParser from "body-parser";
import express from "express";
import Logger from "./Logger";
import Database from "./Database";
import ResponseObject from "../models/ResponseObject";
import Migration from "./Migration";


export default abstract class ApplicationBootstrap{
    app: express.Application;
    port: string | number;

    constructor(){     
        this.app = express();
        this.port = process.env.PORT || 5000;
    }

    async run(){
        this.before();
        if(process.env.DB_STRATEGY === 'update' ){
            await this.dropTables();
        }
        if(process.env.DB_STRATEGY === 'update' || process.env.DB_STRATEGY === 'create' ){
            await this.createTables();
        }
        this.app.use(bodyParser.json());
        this.app.use('/', express.static(__dirname + '/../../static'));
        this.attachRoutes();
        this.app.all('*',(req: express.Request, res: express.Response) => { 
            new ResponseObject(404, 'Route Not Found').response(res, req);
        });
        this.after();
    }

    before(){}
    after(){}

    attachRoutes(){
        this.registerControllers().forEach(controller => {
            this.app.use(controller.defaultRoute(), controller.getRouter());
        })
    }

    async createTables(){
        for(let i = 0; i < this.registerMigrations().length; i++){
            await this.registerMigrations()[i].migrateUp();
        }
        Logger.info('Created All Tables.');
    }

    async dropTables(){
        for(let i = this.registerMigrations().length - 1; i >= 0; i--){
            await this.registerMigrations()[i].migrateDown();
        }
        Logger.info('Dropped all existing tables.');
    }

    public async listen() {
        this.app.listen(this.port, async () => {
            Logger.info(`Server started on port ${this.port}`);
            await Database.authenticate();
        });
    }
    protected abstract registerMiddleware(): any;
    protected abstract registerControllers(): Array<Controller>;
    protected abstract registerMigrations(): Array<Migration>;

}