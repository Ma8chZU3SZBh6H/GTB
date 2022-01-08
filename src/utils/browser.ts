import puppeteer from "puppeteer-extra";
import fakeUa from 'fake-useragent';

const browserOptions = {
    headless: false,
    ignoreHTTPSErrors: true,
    devtools: false,
    slowMo: 60,
    defaultViewport: null,
};

async function Browser() {
    const browser = await puppeteer.launch(browserOptions);
    const page = await browser.newPage();
    let agent = fakeUa();
    await page.setUserAgent(agent);
    return {page, browser};
}

export default Browser;