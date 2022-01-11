import {Router, Express} from 'express';
import * as AppController from '../controllers/AppController';
import {search} from "../controllers/AppController";
import dynamicRoute from "../utils/dynamicRoute";

function AppRoutes(App : Express, path:string){
    const router = Router();
    router.post('/', dynamicRoute(AppController.update));
    router.get('/', AppController.all);
    router.get('/:id(\\d+)', AppController.select);
    router.get('/:name', AppController.search);
    App.use(path, router);
}

export default AppRoutes;