import {Request, Response} from 'express';
import EmailModel from "../models/EmailModel";
import createRumblerAccount from "../apis/rambler/acc/ramblerAcc";
import response from "../constants/response";

export async function all(req : Request, res : Response){
    const emails = await EmailModel.findAll();
    res.send(emails);
}

export async function create(req : Request, res : Response){
    const account = await createRumblerAccount();
    res.send(response.failIfNull(account));
}