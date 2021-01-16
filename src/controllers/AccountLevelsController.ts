import express from "express";
import Controller from "../core/Controller";
import Logger from "../core/Logger";
import AccountLevel from "../models/AccountLevel";
import AccountLevelRepository from "../repositories/AccountLevelRepository";

export default new class AccountLevelsController extends Controller {
    
    public defaultRoute(): string {
        return '/account-levels';
    }
    
    protected initRoutes(): void {
        this.router.get('/', this.index);
        this.router.get('/:id', this.readAccountLevel);
        this.router.post('/', this.createAccountLevel);
        this.router.delete('/:id', this.deleteAccountLevel);
    }

    async index(req: express.Request, res: express.Response) {
        try {
            const accountLevels = await AccountLevelRepository.findAll();
            res.json(accountLevels);
        } catch (error) {
            Logger.error({ message: 'Error occured while getting AccountLevels', error: error.message, class: 'AccountLevelsController' })
            res.status(500).json({});
        }

    }

    async readAccountLevel(req: express.Request, res: express.Response) {
        try {
            const accountLevel = await AccountLevelRepository.findByAccountLevel(req.params.id);
            if (accountLevel) {
                res.json(accountLevel)
            } else {
                res.status(404).json({})
            }
        } catch (error) {
            Logger.error({ message: 'Error occured while getting AccountLevel', error: error.message, class: 'AccountLevelsController' })
            res.status(500).json({})
        }
    }

    async createAccountLevel(req: express.Request, res: express.Response) {
        let al = new AccountLevel();
        al.accountLevel = req.body.accountLevel;
        try {
            let accl = await AccountLevelRepository.create(al);
            res.json(accl);
        } catch (error) {
            Logger.error({ message: 'Error occured while creating AccountLevel', error: error.message, class: 'AccountLevelsController' })
            res.status(500).json({})
        }
    }

    async deleteAccountLevel(req: express.Request, res: express.Response) {
        let al = await AccountLevelRepository.findByAccountLevel(req.params.id);
        if (al) {
            try {
                await AccountLevelRepository.delete(al);
                res.json({});
            } catch (error) {
                Logger.error({ message: 'Error occured while creating AccountLevel', error: error.message, class: 'AccountLevelsController' })
                res.status(500).json({})
            }
        } else {
            res.status(404).json({});
        }

    }

}
