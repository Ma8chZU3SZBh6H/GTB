import dynamicRoute from "../utils/dynamicRoute";
import * as TestController from "../controllers/TestController";
import {Express, Router} from "express";

function TestRoutes(App : Express, path:string){
    const router = Router();
    router.post('/test', dynamicRoute(TestController.test));
    router.post('/test2', dynamicRoute(TestController.test2));
    router.post('/test3', dynamicRoute(TestController.test3));
    App.use(path, router);
}

export default TestRoutes;