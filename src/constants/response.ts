import {States} from "../controllers/AppController.enums";
import {updateApps} from "../apis/steam/apps/apps.update";
import {Request, Response} from 'express';

function successful(data:any) {
    return {
        successful: true,
        payload: data ?? true
    }
}

function failed(data:any){
    return {
        successful: false,
        payload: data ?? null
    }
}

function failIfNull(data:any){
    if (data){
        return successful(data);
    }
    else{
        return failed(data);
    }
}
let state = States.free;
let data = null;
async function auto(res : Response, callback : ()=>Promise<any>){
    switch (state) {
        case States.done:
            state = States.free;
            res.send(response.successful(data ?? true));
            break;
        case States.busy:
            res.send(response.failed(false));
            break;
        case States.free:
        default:
            state = States.busy;
            res.send(response.successful(true));
            data = await callback();
            state = States.done;
            break;
    }

}

const response = {
    successful,
    failed,
    failIfNull,
    auto
}

export default response;