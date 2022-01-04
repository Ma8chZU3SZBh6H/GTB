import {Request, Response} from 'express';
import AppModel from "../models/AppModel";
import {sleep} from "../utils/sleep";
import {States} from "./AppController..enums";
import {updateApps} from "../apis/steam/apps/apps.update";
import {findByName} from "../apis/steam/apps/apps";

export async function all(req : Request, res : Response){
    const apps = await AppModel.findAll();
    if (apps){
        res.send({
            successful: true,
            payload: apps
        });
    }
    else{
        res.send({
            successful: false,
            payload: null
        });
    }
}

let appsUpdate = States.free;
export async function update(req : Request, res : Response){
    switch (appsUpdate) {
        case States.done:
            appsUpdate = States.free;
            res.send({
                successful: true,
                payload: States.done
            });
            break;
        case States.busy:
            res.send({
                successful: false,
                payload: States.busy
            });
            break;
        case States.free:
        default:
            appsUpdate = States.busy;
            res.send({
                successful: true,
                payload: States.busy
            });
            await updateApps();
            appsUpdate = States.done;
            break;
    }
}

export async function search(req : Request, res : Response){
    const name = req.params.name;
    const apps = await findByName(name, 100);
    if (apps){
        res.send({
            successful: true,
            payload: apps
        });
    }
    else{
        res.send({
            successful: false,
            payload: null
        });
    }
}

export async function select(req : Request, res : Response){
    const appId = req.params.id;
    const app = await AppModel.findByPk(appId);
    if (app){
        res.send({
            successful: true,
            payload: app
        });
    }
    else{
        res.send({
            successful: false,
            payload: null
        });
    }
}