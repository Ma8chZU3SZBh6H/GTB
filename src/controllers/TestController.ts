import Browser from "../utils/browser";
import {sleep} from "../utils/sleep";
import * as useProxy from "puppeteer-page-proxy";

export async function test(resolve, reject, wtf) {
    try{
        const {page, browser} = await Browser();
        await page.goto('https://bot.sannysoft.com')
        await page.waitForTimeout(5000)
        await page.screenshot({ path: 'testresult.png', fullPage: true })
        await browser.close()
        console.log(`All done, check the screenshot. ✨`)
        resolve(`All done, check the screenshot. ✨`);
    }catch (e) {
        console.log(e);
        reject(e);
    }
}

export async function test2(resolve, reject, wtf) {
    const {page, browser} = await Browser();
    try{

        await page.goto('https://www.google.com/recaptcha/api2/demo')
        await page.solveRecaptchas();
        await page.click('#recaptcha-demo-submit');
        await page.waitForTimeout(2000);
        await browser.close();

        resolve(`All done`);
    }catch (e) {
        await browser.close();
        console.log(e);
        reject(e);
    }
}

export async function test3(resolve, reject, wtf){
    const {page, browser} = await Browser();
    try{
        await page.goto('https://www.whatismyip.com/proxy-check/')
        await page.waitForTimeout(5000);
        await browser.close();
        resolve(`All done`);
    }catch (e) {
        await browser.close();
        console.log(e);
        reject(e);
    }
}