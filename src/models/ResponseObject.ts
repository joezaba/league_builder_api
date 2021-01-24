import express from "express";

export default class ResponseObject{

    status: number;
    message: string;
    route: string | undefined;
    method: string;
    timestamp: Date | undefined;
    data?: any;


    constructor(status: number, message: string, data?: object ){
        this.status = status;
        this.message = message;
        this.method = '';
        this.route = '';
        this.method = '';
        this.timestamp = undefined


        if(data){
            this.data = data;
        }
    }

    response(res: express.Response, req: express.Request){

        this.route = req.originalUrl;
        this.method = req.method;
        this.timestamp = new Date();

        res.status(this.status).json(this);

    }



}