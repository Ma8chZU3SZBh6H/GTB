import {States} from "../controllers/AppController.enums";

function successful(payload:any = null, state : States = States.done, msg  = null) {
    return {
        state: state,
        message: msg,
        payload: payload
    }
}

function failed(payload:any = null, state : States = States.failed, msg  = null){
    return {
        state: state,
        message: msg,
        payload: payload
    }
}

function failIfNull(payload:any = null){
    if (payload){
        return successful(payload);
    }
    else{
        return failed(payload);
    }
}

const response = {
    successful,
    failed,
    failIfNull
}

export default response;