import express from "express";
import Controller from "../core/Controller";
import ResponseObject from "../models/ResponseObject";
import UserRole from "../models/UserRole";
import UserRoleRepository from "../repositories/UserRoleRepository";


export default new class UserRolesController extends Controller{
    
    public defaultRoute(): string {
        return '/user-roles';
    }
    
    protected initRoutes(): void {
        this.router.get('/', this.index);
        this.router.get('/:id', this.readUserRole);
        this.router.post('/', this.createUserRole);
        this.router.delete('/:id', this.deleteUserRole);
    }

    async index(req: express.Request, res: express.Response) {
        let ro: ResponseObject;
        try {
            const userRoles = await UserRoleRepository.findAll();
            ro = new ResponseObject(200,'OK', { 'userRoles': userRoles } );
        } catch (error) {
            ro = new ResponseObject(500,'Internal Server Error' );
        }
        ro.response(res,req);
    }

    async readUserRole(req: express.Request, res: express.Response) {
        let ro: ResponseObject;
        try {
            const userRole = await UserRoleRepository.findByUserRole(req.params.id);
            if (userRole) {
                ro = new ResponseObject(200,'OK', { 'userRole': userRole } );
            } else {
                ro = new ResponseObject(404,'User Role Not Found');
            }
        } catch (error) {
            ro = new ResponseObject(500,'Internal Server Error' );
        }
        ro.response(res,req);
    }

    async createUserRole(req: express.Request, res: express.Response) {
        let ro: ResponseObject;
        let ur = new UserRole();
        try {
            if (req.body.userRole) {
                ur.userRole = req.body.userRole;
            } else {
                let err = Error('Request must included a userRole field.');
                err.name = 'ER_HTTP_BAD_REQUEST';
                throw err;
            }
            let userRole = await UserRoleRepository.create(ur);
            ro = new ResponseObject(201,'User Role Created', { acccoutLevel: userRole } );
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                ro = new ResponseObject(409,'User Role already Exists');
            } else if (error.name === 'ER_HTTP_BAD_REQUEST') {
                ro = new ResponseObject(400,error.message);
            } else {
                ro = new ResponseObject(500,'Internal Server Error' );
            }
        }
        ro.response(res,req);
    }

    async deleteUserRole(req: express.Request, res: express.Response) {
        let ro: ResponseObject;
        try {
            let ur = await UserRoleRepository.findByUserRole(req.params.id);
            if (ur) {
                await UserRoleRepository.delete(ur);
                ro = new ResponseObject(210,'User Role has been deleted');
            } else {
                ro = new ResponseObject(404,'User Role Not Found');
            }
        } catch (error) {
            if(error.code === 'ER_ROW_IS_REFERENCED_2'){
                ro = new ResponseObject(405,'Cannot Delete User Roles with existing users.');
            } else {
                ro = new ResponseObject(500,'Internal Server Error' );
            }
        }
        ro.response(res,req);
    }
    
}
