import TermiiSmsDriver from "./index";

let t = new TermiiSmsDriver()

t.send({
    body:'hello world',
    from: 'N-Alert',
    to:'+2347086967055'
})
