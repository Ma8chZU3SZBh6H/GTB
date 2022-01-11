import {
  registerEmailAddress,
  captchImage,
  ramblerInputSelector,
  ramblerInputSelectorValue,
  ramblerCaptchaAnswerInput,
  ramblerRegisterButton,
} from "./rambler.providers";
import accGenerator from "../../../utils/accGenerator";
import EmailModel from "../../../models/EmailModel";
import Browser from "../../../utils/browser";
import twoCaptchaBase64 from "../../../utils/twoCaptchaBase64";

const createRumblerAccount = async () : Promise<{name:string, password:string, host:string} | null>  => {
  const acc = accGenerator();
  const {page, browser} = await Browser();

  try {
    await page.goto(registerEmailAddress);

    const img: any = await page.$eval(captchImage, (img) => img.getAttribute('src'));

    const response = await twoCaptchaBase64(img);

    await page.type(ramblerCaptchaAnswerInput, response);

    await page.type('#login', acc.email);
    await page.type('#newPassword', acc.password);
    await page.type('#confirmPassword', acc.password);

    await page.$eval(ramblerInputSelector, (input: any) => input.click());
    await page.$eval(ramblerInputSelectorValue, (value: any) => value.click());

    await page.type('#answer', acc.firstName + acc.lastName);

    await page.$eval(ramblerRegisterButton, (button: any) => button.click());

    await page.waitForNavigation({ timeout: 6000 });

    await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] });

    await browser.close();

    return {
      name: acc.email,
      password: acc.password,
      host: 'rambler.ru'
    }
  } catch (error) {
    console.log(error);
    await browser.close();
    return null;
  }
};

export default createRumblerAccount;