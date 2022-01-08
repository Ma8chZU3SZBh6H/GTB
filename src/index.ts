import express from 'express';
import cors from 'cors';
import sequelize from "./models/index";
import AppRoutes from "./routes/AppRoutes";
import EmailRoutes from "./routes/EmailRoutes";
import * as dotenv from 'dotenv'
import puppeteer from "puppeteer-extra";
import anticaptcha from '@antiadmin/anticaptchaofficial';
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

dotenv.config()

anticaptcha.setAPIKey(process.env.ANTI_CAPTCHA_KEY);
puppeteer.use(StealthPlugin());

const app = express();
const corsOptions = { origin: "http://localhost:3000"};
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppRoutes(app, '/api/steam/apps');
EmailRoutes(app, '/api/account/rambler');

(async () => {
    await import('./models/AppModel');
    await import('./models/EmailModel');
    await sequelize.sync({force: false});
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
})();




