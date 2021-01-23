require('dotenv').config();
import Application from "./core/Application";
import Logger from "./core/Logger";


(async () => {
    try {
        const app = new Application();
        await app.run()
        await app.listen()
    } catch (error) {
        Logger.error(error);
    }
})(); 


