require('dotenv').config();
import Application from "./core/Application";
import Logger from "./core/Logger";
import { migrateUp } from "./core/Migration";


(async () => {
    migrateUp();
    const app = new Application();
    try {
        app.listen();
    } catch (error) {
        Logger.error(error);
    }
})(); 

