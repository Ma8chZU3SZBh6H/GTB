import {Express, Router} from "express";
import * as EmailController from '../controllers/EmailController';

export function EmailRoutes(App : Express, path:string){
    const router = Router();
    router.get('/', EmailController.all);
    router.post('/', EmailController.create);
    App.use(path, router);
}

export default EmailRoutes;