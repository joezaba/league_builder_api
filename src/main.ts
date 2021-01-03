require('dotenv').config();
import Application from "./core/Application";
import Logger from "./core/Logger";

const app = new Application();

try {
    app.listen();
} catch (error) {
    Logger.error(error);
}

