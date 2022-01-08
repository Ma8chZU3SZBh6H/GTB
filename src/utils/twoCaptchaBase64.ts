import axios from "axios";
import poll from 'promise-poller';
import {sleep} from "./sleep";

async function twoCaptchaBase64(img:string) : Promise<string> {
    const requestId = await initiateCaptchaRequest(img);
    return await pollForRequestResults(requestId);
}

async function initiateCaptchaRequest(image:string, language = 1) {
    let IDFKWHATTOCALL = await axios.post(`http://2captcha.com/in.php?key=${process.env.TWO_CAPTCHA_KEY}&language=${language}`, {
        method: 'base64',
        body: image,
    });

    let response: string;
    response = IDFKWHATTOCALL.data.split('|')[1];
    return response;
}

async function pollForRequestResults(id: string, retries = 1000, interval = 1500, delay = 20000) {
    await sleep(delay);
    return poll({
        taskFn: requestCaptchaResults(process.env.TWO_CAPTCHA_KEY, id),
        interval,
        retries,
    });
}

function requestCaptchaResults(apiKey: string, requestId: string) {
    const url = `http://2captcha.com/res.php?key=${apiKey}&action=get&id=${requestId}&json=1`;
    return async function () {
        return new Promise(async function (resolve, reject) {
            const resp = await axios.get(url);
            if (resp.data.status === 0) return reject(resp.data.request);
            resolve(resp.data.request);
        });
    };
}

export default twoCaptchaBase64;