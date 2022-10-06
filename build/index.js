"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@avanda/app");
const http_1 = require("@avanda/http");
class TermiiSmsDriver extends app_1.SMS.SmsDriver {
    async send(msg) {
        var _a;
        let TERMII_API_KEY = app_1.Env.get('TERMII_API_KEY');
        let request = new http_1.Request();
        request.setData({
            "to": msg.to,
            "from": msg.from,
            "sms": msg.body,
            "type": "plain",
            "channel": "dnd",
            "api_key": TERMII_API_KEY,
        });
        try {
            let response = await request.post("https://termii.com/api/sms/send");
            if (response.statusCode > 299)
                throw new Error((_a = response.data) === null || _a === void 0 ? void 0 : _a.message);
            console.log({ response });
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
}
exports.default = TermiiSmsDriver;
