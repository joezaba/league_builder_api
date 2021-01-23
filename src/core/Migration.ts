import Database from "./Database"
import Logger from "./Logger";


export default abstract class Migration {

    abstract up():string;
    abstract down():string;
    before():Promise<any> | void {}
    after():Promise<any> | void {}

    async migrateUp() {
        await this.before();
        try {
            await Database.query( this.up() );
        } catch (error) {
            Logger.error(error);
        }
        await this.after();
    }

    async migrateDown(){
        try{
            return await Database.query(this.down());
        } catch (error) {
            Logger.error(error);
        }
    }
}

