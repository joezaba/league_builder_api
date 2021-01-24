import Model from "../core/Model";

export default class UserRole extends Model {

    public userRole!: string;
    public createdAt!: any;
    public updatedAt!: any;

    constructor(userRole?: string){
        super();
        if(userRole){
            this.userRole = userRole;
        }
    }

}

