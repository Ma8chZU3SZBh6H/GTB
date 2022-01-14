import EmailModelType from "../../../models/EmailModel.types";
import anticaptcha from '@antiadmin/anticaptchaofficial';
import Browser from "../../../utils/browser";
import {registerSteamAddress} from "./steam.providers";
import {Model} from "sequelize";
import * as fs from 'fs';
import * as path from "path";
import getCaptcha from "../../../scripts/getCaptcha";
import {sleep} from "../../../utils/sleep";

const createSteamAccount = async (EmailAcc : Model<EmailModelType>) => {
    const {page, browser} = await Browser();

    const balance = await anticaptcha.getBalance();

    if (balance <= 0) {
        console.log('Buy your anticaptcha balance!');
        return;
    } else {
        console.log('API key balance is ' + balance + ', continuing');
    }

    try {
        await page.goto(registerSteamAddress);

        await page.waitForTimeout(1320);
        await page.type('#email', EmailAcc.get('name') + '@rambler.ru');
        await page.waitForTimeout(1266);
        await page.type('#reenter_email', EmailAcc.get('name')  + '@rambler.ru');

        await page.solveRecaptchas();

        await page.click('#i_agree_check');

        await page.waitForTimeout(2100);
        await page.click('#createAccountButton');
        await page.waitForSelector('#overAgeButton', { visible: true, timeout: 5000 });
        await page.waitForTimeout(1100);
        await page.click('#overAgeButton');

        await page.waitForSelector('body > div:nth-child(5)', { visible: true, timeout: 7000 });

        await browser.close();
        await sleep(100000);
        return true;

    } catch (error) {
        console.log(error);
        await sleep(100000);
        await browser.close();
        return false;
    }
};

export default createSteamAccount;