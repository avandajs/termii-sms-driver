"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("@avanda/app");
const twilio_1 = __importDefault(require("twilio"));
class TwilioSmsDriver extends app_1.SMS.SmsDriver {
    async send(msg) {
        let TWILIO_ACCOUNT_SID = app_1.Env.get('TWILIO_ACCOUNT_SID');
        let TWILIO_AUTH_TOKEN = app_1.Env.get('TWILIO_AUTH_TOKEN');
        let client = (0, twilio_1.default)(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
            lazyLoading: true
        });
        try {
            await client.messages.create({
                from: msg.from,
                to: msg.to,
                body: msg.body,
            });
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
}
exports.default = TwilioSmsDriver;
