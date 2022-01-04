import {Router, Express} from 'express';
import * as AppController from '../controllers/AppController';
import {search} from "../controllers/AppController";

function AppRoutes(App : Express, path:string){
    const router = Router();
    router.get('/', AppController.all);
    router.get('/update', AppController.update);
    router.get('/:id(\\d+)', AppController.select);
    router.get('/:name', AppController.search);
    App.use(path, router);
}

export default AppRoutes;