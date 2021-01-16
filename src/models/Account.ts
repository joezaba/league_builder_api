import Model from "../core/Model";


export class Account extends Model{
    accountId?: number;
    accountName?: string;
    isActive?: number | boolean;
    accountLevel?: string;
    createdAt?: any;
    updatedAt?: any;
}



