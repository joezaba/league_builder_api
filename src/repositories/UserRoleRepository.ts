import Repostitory from "../core/Repository";
import UserRole from "../models/UserRole";


export default new class AccountLevelRepository extends Repostitory {

    tableName(): string {
        return 'user_roles';
    }

    public async findAll(): Promise<Array<UserRole>> {
        let data = await this.selectAll()
        return await data.map((obj: any) => this.jsonToUserRole(obj));
    }

    public async findByUserRole(ur: string): Promise<UserRole | undefined> {
        let data = await this.selectOneWhere('user_role', ur);
        if(data){
            return this.jsonToUserRole(data);
        }
    }

    public async create(ur: UserRole) {
        const values = [ur.userRole];
        await this.insertOne(['user_role'], values);
        return await this.findByUserRole(ur.userRole);
    }

    public async delete(ur: UserRole) {
        await this.deleteWhere('user_role', ur.userRole);
    }

    private jsonToUserRole(obj: any): UserRole {
        let output = new UserRole;

        if (obj.user_role) {
            output.userRole = obj.user_role;
        }
        if (obj.created_at) {
            output.createdAt = obj.created_at;
        }
        if (obj.updated_at) {
            output.updatedAt = obj.updated_at;
        }

        return output;
    }
}

