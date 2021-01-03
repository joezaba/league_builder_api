import winston, { format } from "winston";
const { combine, timestamp, label, printf, metadata } = format;

/**
 * error: 0,
 * warn: 1,
 * info: 2,
 * http: 3,
 * verbose: 4,
 * debug: 5,
 * silly: 6
 */

class Logger {

    logger: winston.Logger;

    constructor() {
        const defaultFormat = printf((info) => {
            let formatStr = `${info.timestamp} [${info.level}] `;

            if (info.status) {
                formatStr += `Status:${info.status}, `;
            }

            formatStr += `${info.message} `;

            if (info.class) {
                formatStr += `(${info.class}) `
            }
            return formatStr;
        });

        const verboseFormat = printf((info) => {
            let formatStr = `${info.timestamp} [${info.level}] `;

            if (info.status) {
                formatStr += `Status:${info.status}, `;
            }

            formatStr += `${info.message} `;

            if (info.class) {
                formatStr += `(${info.class}) `
            }

            if (info.error) {
                formatStr += `\n ${info.error}`
            }
            return formatStr;
        });

        this.logger = winston.createLogger();

        if (process.env.NODE_ENV !== 'test') {
            this.logger.add(new winston.transports.Console({
                level: 'debug',
                format: combine(
                    label({ label: 'Default' }),
                    timestamp(),
                    defaultFormat
                ),
            }));

            this.logger.add(new winston.transports.File({
                filename: 'logs/combined.log',
                level: 'debug',
                format: combine(
                    label({ label: 'Default' }),
                    timestamp(),
                    defaultFormat
                ),
            }));

            this.logger.add(new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
                format: combine(
                    label({ label: 'Default' }),
                    timestamp(),
                    verboseFormat
                ),
            }));
        } else {
            this.logger.add(new winston.transports.File({
                filename: 'logs/test.log',
                level: 'info',
                format: combine(
                    label({ label: 'Default' }),
                    timestamp(),
                    verboseFormat
                ),
            }));
        }

    }



}

export default new Logger().logger