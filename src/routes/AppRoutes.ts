import {Router, Express} from 'express';
import * as AppController from '../controllers/AppController';

function AppRoutes(App : Express, path:string){
    const router = Router();
    router.get('/', AppController.all);
    router.get('/update', AppController.update);
    router.get('/:id', AppController.select);
    App.use(path, router);
}

export default AppRoutes;