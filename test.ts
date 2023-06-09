import TermiiSmsDriver from "./index";

let t = new TermiiSmsDriver()

t.send({
    body:'hello world',
    from: 'fastBeep',
    to:'+2347086967055'
})
