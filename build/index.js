"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@avanda/app");
const http_1 = require("@avanda/http");
class TermiiSmsDriver extends app_1.SMS.SmsDriver {
    async send(msg) {
        var _a;
        let TERMII_API_KEY = app_1.Env.get("TERMII_API_KEY");
        let request = new http_1.Request();
        let payload = {};
        let endpoint;
        if (msg.channel == "whatsapp") {
            endpoint = "/api/send/template";
            payload = {
                phone_number: msg.to,
                device_id: msg.from,
                template_id: msg.template_id,
                api_key: TERMII_API_KEY,
                data: msg.data,
            };
        }
        else {
            endpoint = "/api/sms/send";
            payload = {
                to: msg.to,
                from: msg.from,
                sms: msg.body,
                type: "plain",
                channel: msg.channel || "dnd",
                api_key: TERMII_API_KEY,
            };
        }
        request.setData(payload);
        /**
         * https://v3.api.termii.com
         */
        try {
            let response = await request.post("https://v3.api.termii.com" + endpoint);
            console.log({ response, payload });
            if (response.statusCode > 299)
                throw new Error((_a = response.data) === null || _a === void 0 ? void 0 : _a.message);
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
}
exports.default = TermiiSmsDriver;
