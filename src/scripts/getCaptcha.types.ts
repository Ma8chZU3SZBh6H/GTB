export interface CAPTCHA {
    id:       string;
    version:  string;
    sitekey:  string;
    function: Function;
    callback: string;
    pageurl:  string;
}
