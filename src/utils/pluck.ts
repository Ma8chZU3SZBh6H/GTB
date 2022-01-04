import {sqlModel} from './pluck.types';

export function pluck<t>(apps: any) : t | null{
    if (apps && apps.map){
        return apps.map((app: sqlModel<t>)=>app.dataValues);
    }else if(apps){
        return apps.dataValues;
    }
    else{
        return null;
    }
}