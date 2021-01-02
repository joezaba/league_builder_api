import Excpetion from "../core/Exception";

export default class SqlException extends Excpetion {

    constructor(message: string){
        super(message, 'SqlException');
    }
}