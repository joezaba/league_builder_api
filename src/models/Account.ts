import Model from "../core/Model";


export class Account extends Model{
    public accountId!: number;
    public accountName!: string;
    public isActive!: boolean;
    public accountLevel!: string;
    public createdAt!: any;
    public updatedAt!: any;
}



