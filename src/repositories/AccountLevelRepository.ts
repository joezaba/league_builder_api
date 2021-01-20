import Database from "../core/Database";
import Repostitory from "../core/Repository";
import AccountLevel from "../models/AccountLevel";


export default new class AccountLevelRepository extends Repostitory {

    tableName(): string {
        return 'account_levels';
    }

    public async findAll(): Promise<Array<AccountLevel>> {
        let data = await this.selectAll()
        return await data.map((obj: any) => this.jsonToAccountLevel(obj));
    }

    public async findByAccountLevel(al: string): Promise<AccountLevel | undefined> {
        let data = await this.selectOneWhere('account_level', al);
        if(data){
            return this.jsonToAccountLevel(data);
        }
    }

    public async create(al: AccountLevel) {
        const values = [[al.accountLevel]];
        await Database.query('INSERT INTO account_levels ( account_level ) VALUES ?', [values]);
        let accl = await this.findByAccountLevel(al.accountLevel);
        return accl;
    }

    public async delete(al: AccountLevel) {
        await this.deleteWhere('account_level', al.accountLevel);
    }

    private jsonToAccountLevel(obj: any): AccountLevel {
        let output = new AccountLevel;

        if (obj.account_level) {
            output.accountLevel = obj.account_level;
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

