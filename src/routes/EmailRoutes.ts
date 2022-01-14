import {Express, Router} from "express";
import * as EmailController from '../controllers/EmailController';
import dynamicRoute from "../utils/dynamicRoute";

export function EmailRoutes(App : Express, path:string){
    const router = Router();
    router.get('/', EmailController.all);
    router.post('/', dynamicRoute(EmailController.create));
    App.use(path, router);
}

export default EmailRoutes;