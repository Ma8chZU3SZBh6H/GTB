import {raw, Request, Response} from 'express';
import EmailModel from "../models/EmailModel";
import response from "../utils/response";
import {updateApps} from "../apis/apps/apps.update";
import {pluck} from "../utils/pluck";
import EmailModelType from "../models/EmailModel.types";
import {sleep} from "../utils/sleep";
import createSteamAccount from "../apis/accounts/steam/steam";
import {Model, Op} from "sequelize";
import verifySteamAccount from "../apis/accounts/steam/verify";
import * as moment from "moment";

export async function create(resolve, reject, wtf) {
    //const email = await EmailModel.findOne<Model<EmailModelType>>({where: {used:{[Op.gt]: moment().add(10,'minutes').toDate()}}});
    const email = await EmailModel.findOne<Model<EmailModelType>>({
        where: {
            used:{
                [Op.lte]: moment().subtract(10,'minutes').toDate()
            },
            verified: null
        },
        order:[
            ['createdAt', 'DESC']
        ]
    });

    if (email){
        wtf('Creating steam acc...');
        const status = await createSteamAccount(email);

        if (status){
            wtf('Steam acc created!');
            email.set('used', moment().toDate());
            await email.save();
            resolve(true);
        }
        else{
            reject('Failed to create steam acc.');
        }
    }else{
        reject('No available emails.');
    }
}

export async function verify(resolve, reject, wtf){
    const email = await EmailModel.findOne<Model<EmailModelType>>({
        where: {
            used:{
                [Op.gt]: moment().subtract(10,'minutes').toDate()
            },
            verified: null
        },
        order:[
            ['createdAt', 'DESC']
        ]
    });
    if (email){
        const status = await verifySteamAccount(email);
        if (status){
            resolve(true);
        }else{
            reject('Failed to verify steam acc.');
        }
    }
    else{
        reject('No available emails.');
    }
}