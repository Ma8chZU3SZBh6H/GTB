import {States} from "../controllers/AppController.enums";
import response from "./response";
import {Request, Response} from 'express';

function exe(defaultState, callback){
    return new Promise(async (resolve, reject)=>await callback(resolve, reject, defaultState.setWtf)).then((payload)=>{
        defaultState.payload = payload;
        defaultState.state = States.done;
    }).catch((payload)=>{
        if (payload){
            defaultState.wtf = payload;
        }
        defaultState.state = States.failed;
    })
}

function dynamicRoute(callback: (resolve, reject, wtf)=>Promise<void>) {
    const defaultState = {
        state: States.free,
        payload: null,
        wtf: 'Starting...',
        setWtf: (wtf:string) => defaultState.wtf = wtf
    }

    return async (req : Request, res : Response)=>{
        switch (defaultState.state) {
            case States.busy:
                res.send(response.successful(null, States.busy, defaultState.wtf));
                break;
            case States.done:
                res.send(response.successful(defaultState.payload, States.done, defaultState.wtf));
                defaultState.state = States.free;
                break;
            case States.failed:
                res.send(response.failed(null, States.failed, defaultState.wtf));
                defaultState.state = States.free;
                break;
            case States.free:
            default:
                defaultState.setWtf('Starting...');
                defaultState.state = States.busy;
                defaultState.payload = null;
                res.send(response.successful(null, States.free, defaultState.wtf));
                await exe(defaultState, callback);
        }
    }
}

export default dynamicRoute;