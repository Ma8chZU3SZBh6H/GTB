import {Request, Response} from 'express';
import AppModel from "../models/AppModel";
import {States} from "./AppController.enums";
import {updateApps} from "../apis/steam/apps/apps.update";
import {findByName} from "../apis/steam/apps/apps";
import response from "../constants/response";

export async function all(req : Request, res : Response){
    const apps = await AppModel.findAll();
    res.send(response.failIfNull(apps));
}

let appsUpdate = States.free;
export async function update(req : Request, res : Response){
    switch (appsUpdate) {
        case States.done:
            appsUpdate = States.free;
            res.send(response.successful(States.done));
            break;
        case States.busy:
            res.send(response.failed(States.busy));
            break;
        case States.free:
        default:
            appsUpdate = States.busy;
            res.send(response.successful(States.busy));
            await updateApps();
            appsUpdate = States.done;
            break;
    }
}

export async function search(req : Request, res : Response){
    const name = req.params.name;
    const apps = await findByName(name, 100);
    res.send(response.failIfNull(apps));
}

export async function select(req : Request, res : Response){
    const appId = req.params.id;
    const app = await AppModel.findByPk(appId);
    res.send(response.failIfNull(app));
}