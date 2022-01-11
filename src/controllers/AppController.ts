import {Request, Response} from 'express';
import AppModel from "../models/AppModel";
import {States} from "./AppController.enums";
import {updateApps} from "../apis/apps/apps.update";
import {findByName} from "../apis/apps/apps";
import response from "../constants/response";
import {sleep} from "../utils/sleep";

export async function all(req : Request, res : Response){
    const limit = req.query.limit;
    const apps = await AppModel.findAll({limit: limit ?? 100});
    res.send(response.failIfNull(apps));
}

export async function update(req : Request, res : Response){
    await response.auto(res, async ()=>await updateApps());
}

export async function search(req : Request, res : Response){
    const name = req.params.name;
    const limit = req.query.limit;
    const apps = await findByName(name, limit ?? 100);
    res.send(response.failIfNull(apps));
}

export async function select(req : Request, res : Response){
    const appId = req.params.id;
    const app = await AppModel.findByPk(appId);
    res.send(response.failIfNull(app));
}