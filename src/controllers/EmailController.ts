import {Request, Response} from 'express';
import EmailModel from "../models/EmailModel";
import createRumblerAccount from "../apis/accounts/rambler/rambler";
import response from "../utils/response";

export async function all(req : Request, res : Response){
    const emails = await EmailModel.findAll();
    res.send(response.failIfNull(emails));
}


export async function create(resolve, reject, wtf){
    wtf('Creating email!');
    const acc = await createRumblerAccount();
    if (acc){
        wtf('Storing created email to database.');
        await EmailModel.create({
            name: acc.name,
            password: acc.password,
            host: 'rambler.ru',
            used: Date.now(),
        });
        wtf('Email created!');
        resolve(acc);
    }
    else{
        reject('Failed to create email');
    }
}

