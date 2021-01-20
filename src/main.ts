require('dotenv').config();
import Application from "./core/Application";
import Logger from "./core/Logger";
import { migrateDown, migrateUp } from "./core/Migration";


(async () => {
    try {
        await migrateDown();
        await migrateUp();
        const app = new Application();
        app.listen();
    } catch (error) {
        Logger.error(error);
    }
})(); 


