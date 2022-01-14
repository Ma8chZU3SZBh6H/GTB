import {Express, Router} from 'express';
import * as SteamController from '../controllers/SteamController';
import dynamicRoute from "../utils/dynamicRoute";

function SteamRoutes(App : Express, path:string){
    const router = Router();
    router.post('/', dynamicRoute(SteamController.create));
    router.post('/verify', dynamicRoute(SteamController.verify));
    App.use(path, router);
}

export default SteamRoutes;