import { SMS, Env } from "@avanda/app";
import { Request } from "@avanda/http";
interface Msg {
  to: string;
  from?: string;
  body: string;
  channel?: string;
}

export default class TermiiSmsDriver extends SMS.SmsDriver {
  async send(msg: Msg): Promise<boolean> {
    let TERMII_API_KEY = Env.get<string>("TERMII_API_KEY");

    let request = new Request();
    let payload = {
      to: msg.to,
      from: msg.from,
      sms: msg.body,
      type: "plain",
      channel: msg.channel || "dnd",
      api_key: TERMII_API_KEY,
    };

    request.setData(payload);

    /**
     * https://v3.api.termii.com
     */

    try {
      let response = await request.post(
        "https://v3.api.termii.com/api/sms/send"
      );
      console.log({ response, payload });
      if (response.statusCode > 299) throw new Error(response.data?.message);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
