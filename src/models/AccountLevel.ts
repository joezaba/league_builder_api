import Model from "../core/Model";

export default class AccountLevel extends Model {

    public accountLevel!: string;
    public createdAt!: any;
    public updatedAt!: any;

    constructor(accountLevel?: string){
        super();
        if(accountLevel){
            this.accountLevel = accountLevel
        }
    }

}

