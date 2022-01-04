import {Router, Express} from 'express';
import * as AppController from '../controllers/AppController';

function AppRoutes(App : Express){
    const router = Router();
    router.get('/', AppController.create);
    App.use('/test', router);
}

export default AppRoutes;