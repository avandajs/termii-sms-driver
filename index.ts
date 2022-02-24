import {SMS,Env} from "@avanda/app"
import twilio from "twilio"

export default class TwilioSmsDriver extends SMS.SmsDriver{
    async send(msg): Promise<boolean> {
        let TWILIO_ACCOUNT_SID = Env.get<string>('TWILIO_ACCOUNT_SID')
        let TWILIO_AUTH_TOKEN = Env.get<string>('TWILIO_AUTH_TOKEN')

        let client = twilio(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,{
            lazyLoading: true
        })
        try {
            await client.messages.create({
                from: msg.from,
                to: msg.to,
                body: msg.body,
            })
            return  true;
        }catch (e) {
            console.error(e);
            return  false;
        }
    }

}