import Excpetion from "../core/Exception";

export default class DBConnectionException extends Excpetion {
    constructor(message: string){
        super(message, 'DBConnectionException');
    }
}