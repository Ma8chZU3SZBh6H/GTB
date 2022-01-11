import EmailModelType from "../../../models/EmailModel.types";
import anticaptcha from '@antiadmin/anticaptchaofficial';
import Browser from "../../../utils/browser";
import {registerSteamAddress} from "./steam.providers";
import {Model} from "sequelize";

const createSteamAccount = async (EmailAcc : Model<EmailModelType>) => {
    return;
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

        console.log('ONE');
        await page.waitForSelector('[title="reCAPTCHA"]');
        let iframeUrl = await page.$eval('[title="reCAPTCHA"]', (iframe) => iframe.getAttribute('src'));
        iframeUrl = iframeUrl?.split('&k=')[1]!;
        iframeUrl = iframeUrl?.split('&co=')[0]!;
        console.log('TWO');
        const s = await page.evaluate(`___grecaptcha_cfg.clients['0']['X']['X'].s`);
        console.log('three');
        console.log('s:', s);
        console.log('iframe', iframeUrl);

        const token = await anticaptcha.solveRecaptchaV2EnterpriseProxyless('https://store.steampowered.com/join', iframeUrl, {s: s,});

        await page.evaluate(`document.getElementById("g-recaptcha-response").innerHTML="${token}";`);

        await page.click('#i_agree_check');

        await page.waitForTimeout(2100);
        await page.click('#createAccountButton');
        await page.waitForSelector('#overAgeButton', { visible: true, timeout: 5000 });
        await page.waitForTimeout(1100);
        await page.click('#overAgeButton');

        await page.waitForSelector('body > div:nth-child(5)', { visible: true, timeout: 7000 });

        await browser.close();

        return true;

    } catch (error) {
        console.log(error);
        await browser.close();
        return false;
    }
};

export default createSteamAccount;