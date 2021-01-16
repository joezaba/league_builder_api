import Database from "../core/Database";
import Logger from "../core/Logger";
import Repostitory from "../core/Repository";
import { Account } from "../models/Account";

export default new class AccountRepostory extends Repostitory {

    tableName(): string { 
        return 'accounts'; 
    }

    async findAll() {
        let data = await this.selectAll();
        return data.map((obj: any) => this.jsonToAccount(obj));
    }

    async findByAccountId(id: number | string) {
        return this.jsonToAccount(await this.selectOneWhere('account_id', id));
    }

    async create(acc: Account) {
        let rows = Array<string>();
        let values = Array<string>();
        if(acc.accountName){
            rows.push('account_name');
            values.push(acc.accountName);
        }
        if(acc.accountLevel){
            rows.push('account_level');
            values.push(acc.accountLevel);
        }
        if(acc.isActive != null){
            rows.push('is_active');
            values.push(acc.isActive + '');
        }
        let id = await this.insertOne(rows, values);
        return await this.findByAccountId(id);
    }

    async delete(acc: Account) {
        if (acc.accountId) 
            return await this.deleteWhere('account_id', acc.accountId);
        return false;
    }

    async update(acc: Account) {
        let rows: Array<string> = [];
        let values: Array<string> = [];
        if(acc.accountName){
            rows.push('account_name');
            values.push(acc.accountName);
        }
        if(acc.accountLevel){
            rows.push('account_level');
            values.push(acc.accountLevel);
        }
        if(acc.isActive != null){
            rows.push('is_active');
            values.push(acc.isActive + '');
        }
        if(acc.accountId) {
            await this.updateWhere(rows, values, 'account_id', acc.accountId )
            return this.jsonToAccount(await this.selectOneWhere('account_id', acc.accountId));
        }
    }

    jsonToAccount(obj: any): Account {
        let output = new Account;
        if (obj.account_id) output.accountId = obj.account_id;
        if (obj.account_name) output.accountName = obj.account_name;
        if (obj.is_active != null) output.isActive = obj.is_active;
        if (obj.account_level) output.accountLevel = obj.account_level;
        if (obj.created_at) output.createdAt = obj.created_at;
        if (obj.updated_at) output.updatedAt = obj.updated_at;
        return output;
    }

}