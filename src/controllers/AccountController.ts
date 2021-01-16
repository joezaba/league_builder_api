import express from "express";
import Controller from "../core/Controller";
import AccountRepository from "../repositories/AccountRepository";

/**
 * Represents Controller to handle HTTP requests for accounts.
 * 
 * @author Joe Zaba
 */
export default new class AccountController extends Controller {
    
    public defaultRoute(): string {
        return '/accounts';
    }

    protected initRoutes(): void {
        this.router.get('/', this.index);
        this.router.get('/:id', this.readAccount);
        this.router.post('/', this.createAccount);
        this.router.patch('/', this.updateAccount);
        this.router.delete('/:id', this.deleteAccount);
    }

    async index(req: express.Request, res: express.Response): Promise<void> {
        res.json(await AccountRepository.findAll())
    }

    async readAccount(req: express.Request, res: express.Response): Promise<void> {
        res.json(await AccountRepository.findByAccountId(req.params.id))
    }

    async createAccount(req: express.Request, res: express.Response): Promise<void> {
        let account = AccountRepository.jsonToAccount(req.body);
        account = await AccountRepository.create(account);
        res.json(account);
    }

    async updateAccount(req: express.Request, res: express.Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async deleteAccount(req: express.Request, res: express.Response): Promise<void> {
        throw new Error("Method not implemented.");
    }

}