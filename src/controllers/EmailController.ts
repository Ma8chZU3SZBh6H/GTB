import {Request, Response} from 'express';
import EmailModel from "../models/EmailModel";
import createRumblerAccount from "../apis/rambler/acc/ramblerAcc";
import response from "../constants/response";

export async function all(req : Request, res : Response){
    const emails = await EmailModel.findAll();
    res.send(emails);
}


export async function create(req : Request, res : Response){
    await response.auto(res, async ()=>await createRumblerAccount());
}