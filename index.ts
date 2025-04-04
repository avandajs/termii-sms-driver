import { SMS, Env } from "@avanda/app";
import Msg from "@avanda/app/modules/SMS/types/Msg";
import { Request } from "@avanda/http";

export default class TermiiSmsDriver extends SMS.SmsDriver {
  async send(msg: Msg): Promise<boolean> {
    let TERMII_API_KEY = Env.get<string>("TERMII_API_KEY");

    let request = new Request();
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
    } else {
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
      if (response.statusCode > 299) throw new Error(response.data?.message);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
