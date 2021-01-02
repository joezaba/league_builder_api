import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export default abstract class Repostitory {


    protected parseResults(results: [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]]) {
        return JSON.parse(JSON.stringify(results))[0]
    }
}