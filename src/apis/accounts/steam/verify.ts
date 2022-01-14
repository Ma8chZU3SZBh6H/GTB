import Browser from "../../../utils/browser";
import {ramblerLoginSubmit, steamVerifyEmailMessage, verifySteamramblerAddress} from "./verify.providers";
import {Model} from "sequelize";
import EmailModelType from "../../../models/EmailModel.types";
import anticaptcha from '@antiadmin/anticaptchaofficial';
import {sleep} from "../../../utils/sleep";

const verifySteamAccount = async (EmailAcc : Model<EmailModelType>) => {
    const {page, browser} = await Browser();

    try {
        await page.goto(verifySteamramblerAddress);

        await page.waitForSelector('#login');
        await page.type('#login', EmailAcc.get('name') + '@rambler.ru');
        await page.type('#password', <string>EmailAcc.get('password'));
        await page.click(ramblerLoginSubmit);

        await page.solveRecaptchas();
        await page.waitForTimeout(2000);
        await page.click(ramblerLoginSubmit);

        console.log('NA MINUS TWO');
        await page.waitForNavigation({ timeout: 100000 });

        console.log('NA MINUS ONE');
        //go to page
        await page.goto('https://mail.rambler.ru/folder/INBOX?category=lists');

        //select the latest email
        console.log('NA ZERO');
        await page.waitForSelector('.ListItem-root-1i');
        page.evaluate(() => {
            const link: any = document.querySelectorAll('.ListItem-root-1i')[0];
            link.click();
        });

        //wait for steam link and click
        console.log('NA ONE');
        await page.waitForSelector(steamVerifyEmailMessage);
        console.log('NA TWO');
        await page.click(steamVerifyEmailMessage);
        console.log('NA THREE');
        await page.waitForNavigation({ timeout: 10000 });

        console.log('steam verified');
        await sleep(100000);
        await browser.close();
        return true;
    } catch (error) {
        console.log(error);
        await sleep(100000);
        await browser.close();
        return false;
    }
};

export default verifySteamAccount;