import express from 'express';

export default abstract class Controller {
    protected router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initRoutes();
    }

    protected abstract initRoutes(): void;
    public abstract defaultRoute(): string;

    public getRouter(): express.Router {
        return this.router;
    }

}

