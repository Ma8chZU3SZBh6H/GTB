import {raw, Request, Response} from 'express';
import EmailModel from "../models/EmailModel";
import response from "../utils/response";
import {updateApps} from "../apis/apps/apps.update";
import {pluck} from "../utils/pluck";
import EmailModelType from "../models/EmailModel.types";
import {sleep} from "../utils/sleep";
import createSteamAccount from "../apis/accounts/steam/steam";
import {Model} from "sequelize";

export async function create(resolve, reject, wtf) {
    const email = await EmailModel.findOne<Model<EmailModelType>>({where: {used:false}});
    if (email){
        wtf('Creating steam acc...');
        const status = await createSteamAccount(email);

        if (status){
            wtf('Steam acc created!');
            email.set('used', true);
            await email.save();
            resolve(true);
        }
        else{
            console.log(status);
            reject('Failed to create steam acc.');
        }
    }else{
        reject('No available emails.');
    }
}