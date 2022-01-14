import puppeteer from "puppeteer-extra";
import * as useProxy from 'puppeteer-page-proxy';

const browserOptions = {
    headless: false,
    ignoreHTTPSErrors: true,
    devtools: false,
    slowMo: 60,
    //args: ['--proxy-server=socks5=62.109.31.192:20000']
    //defaultViewport: null,
    // args: [
    //     '--no-sandbox',
    //     '--disable-setuid-sandbox',
    //     '--disable-background-timer-throttling',
    //     '--disable-backgrounding-occluded-windows',
    //     '--disable-renderer-backgrounding',
    //     '--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3803.0 Safari/537.36',
    //     // THIS IS THE KEY BIT!
    //     '--lang=en-US,en;q=0.9',
    //
    // ]
};

async function Browser() {
    const browser = await puppeteer.launch(browserOptions);
    const page = await browser.newPage();
    return {page, browser};
}

export default Browser;