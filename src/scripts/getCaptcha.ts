import * as fs from "fs";
import * as path from "path";
import {Page} from "puppeteer";
import {CAPTCHA} from "./getCaptcha.types";

async function getCaptcha(page : Page) : Promise<CAPTCHA> {
    const getCaptchaScript = fs.readFileSync(path.resolve(__dirname, '../src/scripts/getCaptchaScript.js')).toString();
    return await page.evaluate(getCaptchaScript);
}

export default getCaptcha;