import express from "express";
import Controller from "../core/Controller";
import Logger from "../core/Logger";
import AccountLevel from "../models/AccountLevel";
import ResponseObject from "../models/ResponseObject";
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
        let ro: ResponseObject;
        try {
            const accountLevels = await AccountLevelRepository.findAll();
            ro = new ResponseObject(200,'OK', { 'acccoutLevels': accountLevels } );
        } catch (error) {
            ro = new ResponseObject(500,'Internal Server Error' );
        }
        ro.response(res,req);
    }

    async readAccountLevel(req: express.Request, res: express.Response) {
        let ro: ResponseObject;
        try {
            const accountLevel = await AccountLevelRepository.findByAccountLevel(req.params.id);
            if (accountLevel) {
                ro = new ResponseObject(200,'OK', { 'acccoutLevel': accountLevel } );
            } else {
                ro = new ResponseObject(404,'Account Level Not Found');
            }
        } catch (error) {
            ro = new ResponseObject(500,'Internal Server Error' );
        }
        ro.response(res,req);
    }

    async createAccountLevel(req: express.Request, res: express.Response) {
        let ro: ResponseObject;
        let al = new AccountLevel();
        try {
            if (req.body.accountLevel) {
                al.accountLevel = req.body.accountLevel;
            } else {
                let err = Error('Request must included an accountLevel field.');
                err.name = 'ER_HTTP_BAD_REQUEST';
                throw err;
            }
            let accl = await AccountLevelRepository.create(al);
            //res.status(201).json({ status: 201, message: 'Account Level Created', data: { acccoutLevel: accl } });
            ro = new ResponseObject(201,'Account Level Created', { acccoutLevel: accl } );
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                //res.status(409).json({ status: 409, message: 'Account Level already Exists' })
                ro = new ResponseObject(409,'Account Level already Exists');
            } else if (error.name === 'ER_HTTP_BAD_REQUEST') {
                //res.status(400).json({ status: 400, message: error.message })
                ro = new ResponseObject(400,error.message);
            } else {
                ro = new ResponseObject(500,'Internal Server Error' );
            }
        }
        ro.response(res,req);
    }

    async deleteAccountLevel(req: express.Request, res: express.Response) {
        let ro: ResponseObject;
        try {
            let al = await AccountLevelRepository.findByAccountLevel(req.params.id);
            if (al) {
                await AccountLevelRepository.delete(al);
                ro = new ResponseObject(210,'Account Level has been deleted');
            } else {
                ro = new ResponseObject(404,'Account Level Not Found');
            }
        } catch (error) {
            if(error.code === 'ER_ROW_IS_REFERENCED_2'){
                ro = new ResponseObject(405,'Cannot Delete Account Level with existing accounts.');
            } else {
                ro = new ResponseObject(500,'Internal Server Error' );
            }
        }
        ro.response(res,req);
    }

}
