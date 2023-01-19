const { proto, delay, getContentType, downloadContentFromMessage} = require('@adiwajshing/baileys')
const chalk = require('chalk')
const fs = require('fs')
const Crypto = require('crypto')
const axios = require('axios')
const moment = require('moment-timezone')
const { sizeFormatter } = require('human-readable')
const util = require('util')
const Jimp = require('jimp')
const { defaultMaxListeners } = require('stream')

const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds

exports.generateMessageTag = (epoch) => {
let tag = (0, exports.unixTimestampSeconds)().toString();
if (epoch)
tag += '.--' + epoch; // attach epoch if provided
return tag;
}

exports.processTime = (timestamp, now) => {
return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}
exports.UserAgent = () => {
const UA = [
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
"Mozilla/5.0 (X11; Datanyze; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/E7FBAF",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 Edge/15.15063",
"Mozilla/5.0 (X11; Linux x86_64; rv:45.0) Gecko/20100101 Firefox/45.0",
"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0",
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.2.7 (KHTML, like Gecko) Version/9.0.1 Safari/601.2.7",
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0",
"Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:47.0) Gecko/20100101 Firefox/47.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36",
];
const res = UA[~~(Math.random() * UA.length)];
return res;
};
exports.getBuffer = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (err) {
return err
}
}

exports.fetchJson = async (url, options) => {
try {
options ? options : {}
const res = await axios({
method: 'GET',
url: url,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
},
...options
})
return res.data
} catch (err) {
return err
}
}

exports.runtime = function(seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600 * 24));
var h = Math.floor(seconds % (3600 * 24) / 3600);
var m = Math.floor(seconds % 3600 / 60);
var s = Math.floor(seconds % 60);
var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.clockString = (ms) => {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.sleep = async (ms) => {
return new Promise(resolve => setTimeout(resolve, ms));
}

exports.isUrl = (url) => {
return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}
exports.isUrltiktok = (url) => {
return url.match(new RegExp(/https:?\/\/.+\.tiktok.+/g)) 
}
exports.getTime = (format, date) => {
if (date) {
return moment(date).locale('id').format(format)
} else {
return moment.tz('Asia/Jakarta').locale('id').format(format)
}
}

exports.formatDate = (n, locale = 'id') => {
let d = new Date(n)
return d.toLocaleDateString(locale, {
weekday: 'long',
day: 'numeric',
month: 'long',
year: 'numeric',
hour: 'numeric',
minute: 'numeric',
second: 'numeric'
})
}

exports.tanggal = (numer) => {
myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum’at','Sabtu']; 
var tgl = new Date(numer);
var day = tgl.getDate()
bulan = tgl.getMonth()
var thisDay = tgl.getDay(),
thisDay = myDays[thisDay];
var yy = tgl.getYear()
var year = (yy < 1000) ? yy + 1900 : yy; 
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
let d = new Date
let locale = 'id'
let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				
return`${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

exports.formatp = sizeFormatter({
std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
decimalPlaces: 2,
keepTrailingZeroes: false,
render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.jsonformat = (string) => {
return JSON.stringify(string, null, 2)
}

function format(...args) {
return util.format(...args)
}

var _0x4fc82b=_0xa23b;function _0xa23b(_0x30d9a5,_0x39510d){var _0x46ec18=_0x1e62();return _0xa23b=function(_0x38590b,_0x6a826b){_0x38590b=_0x38590b-(-0x3b3+-0xdc6+0x1203);var _0x1c3258=_0x46ec18[_0x38590b];return _0x1c3258;},_0xa23b(_0x30d9a5,_0x39510d);}(function(_0x29c852,_0x445c96){var _0xab5c17=_0xa23b,_0x2613a1=_0x29c852();while(!![]){try{var _0x3c76a8=-parseInt(_0xab5c17(0x9a))/(-0x6*-0xf8+0x18d1+-0x23*0xe0)*(parseInt(_0xab5c17(0x94))/(0x2447+0x1*-0x35d+-0x1a*0x144))+parseInt(_0xab5c17(0x8a))/(0x1096+0x6*-0x523+0xe3f*0x1)+-parseInt(_0xab5c17(0x8e))/(-0x5*0x411+0x974+0xae5*0x1)+parseInt(_0xab5c17(0x96))/(-0x512+-0x2*-0x123+-0x2d1*-0x1)*(-parseInt(_0xab5c17(0x9e))/(-0x761+-0x21d*0x8+0x184f))+-parseInt(_0xab5c17(0x9b))/(-0x3*0x2d8+-0x13b2*-0x1+-0xb23)+parseInt(_0xab5c17(0x99))/(0x2548+0x1018+-0x11c8*0x3)*(parseInt(_0xab5c17(0x91))/(0x141c+-0xc*-0x17a+-0x25cb))+parseInt(_0xab5c17(0x95))/(0x64c+0x2*0xf25+0x248c*-0x1)*(parseInt(_0xab5c17(0x97))/(-0x169*-0x3+0xcb3+-0x10e3));if(_0x3c76a8===_0x445c96)break;else _0x2613a1['push'](_0x2613a1['shift']());}catch(_0x15c6c2){_0x2613a1['push'](_0x2613a1['shift']());}}}(_0x1e62,0x14df7*0x8+0x1*-0x5bbb5+0xe1cf),exports[_0x4fc82b(0x9c)]=_0x4fc82b(0x8b)+_0x4fc82b(0x98),exports[_0x4fc82b(0x92)]=_0x4fc82b(0x8d),exports[_0x4fc82b(0x8f)]=_0x4fc82b(0x8d),exports[_0x4fc82b(0x93)]=_0x4fc82b(0x90)+_0x4fc82b(0x8c)+_0x4fc82b(0x9d)+_0x4fc82b(0x8d));function _0x1e62(){var _0x233e25=['packname','myyt','262PPwUZd','130sqABhl','1765SBLaeQ','1101683IuiAte','\x20Zero\x20YT7','32XKKrFm','5111xhDSlr','2021873JigwAU','creator','y\x20Youtube\x20','3900Exhmhl','1557885LUfvVw','Created\x20By','ubscribe\x20M','Zero\x20YT7','1317776tHPDJi','author','Please\x20A\x20S','139554FQTYog'];_0x1e62=function(){return _0x233e25;};return _0x1e62();}

exports.logic = (check, inp, out) => {
if (inp.length !== out.length) throw new Error('Input and Output must have same length')
for (let i in inp)
if (util.isDeepStrictEqual(check, inp[i])) return out[i]
return null
}

exports.generateProfilePicture = async (buffer) => {
const jimp = await Jimp.read(buffer)
const min = jimp.getWidth()
const max = jimp.getHeight()
const cropped = jimp.crop(0, 0, min, max)
return {
img: await cropped.scaleToFit(720, 300).getBufferAsync(Jimp.MIME_JPEG),
preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
}
}
exports.updateProfilePicture = async (buffer) => {
const jimp = await Jimp.read(buffer)
const min = jimp.getWidth()
const max = jimp.getHeight()
const cropped = jimp.crop(0, 0, min, max)
return {
img: await cropped.scaleToFit(720, 300).getBufferAsync(Jimp.MIME_JPEG),
preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
}
}

exports.makeid = (length) => {
let result = '';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = characters.length;
for (let i = 0; i < length; i++) {
result += characters.charAt(Math.floor(Math.random() *
charactersLength));
}
return result;
}

exports.bytesToSize = (bytes, decimals = 2) => {
if (bytes === 0) return '0 Bytes';

const k = 1024;
const dm = decimals < 0 ? 0 : decimals;
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

const i = Math.floor(Math.log(bytes) / Math.log(k));

return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.getSizeMedia = (path) => {
return new Promise((resolve, reject) => {
if (/http/.test(path)) {
axios.get(path)
.then((res) => {
let length = parseInt(res.headers['content-length'])
let size = exports.bytesToSize(length, 3)
if(!isNaN(length)) resolve(size)
})
} else if (Buffer.isBuffer(path)) {
let length = Buffer.byteLength(path)
let size = exports.bytesToSize(length, 3)
if(!isNaN(length)) resolve(size)
} else {
reject('error gatau apah')
}
})
}

exports.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.smsg = (conn, m, store) => {
if (!m) return m
let M = proto.WebMessageInfo
if (m.key) {
m.id = m.key.id
m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
from = m.key.remoteJid
m.fromMe = m.key.fromMe
m.isGroup = from.endsWith('@g.us')
m.sender = conn.decodeJid(m.fromMe && conn.user.id || m.participant || m.key.participant || from || '')
if (m.isGroup) m.participant = conn.decodeJid(m.key.participant) || ''
}
if (m.message) {
m.mtype = getContentType(m.message)
m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text
let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
if (m.quoted) {
let type = getContentType(quoted)
m.quoted = m.quoted[type]
if (['productMessage'].includes(type)) {
type = getContentType(m.quoted)
m.quoted = m.quoted[type]
}
if (typeof m.quoted === 'string') m.quoted = {
text: m.quoted
}
m.quoted.mtype = type
m.quoted.id = m.msg.contextInfo.stanzaId
m.quoted.chat = m.msg.contextInfo.remoteJid || from
m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
m.quoted.sender = conn.decodeJid(m.msg.contextInfo.participant)
m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id)
m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
m.getQuotedObj = m.getQuotedMessage = async () => {
if (!m.quoted.id) return false
let q = await store.loadMessage(from, m.quoted.id, conn)
return exports.smsg(conn, q, store)
}
let vM = m.quoted.fakeObj = M.fromObject({
key: {
remoteJid: m.quoted.chat,
fromMe: m.quoted.fromMe,
id: m.quoted.id
},
message: quoted,
...(m.isGroup ? { participant: m.quoted.sender } : {})
})

m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })

m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)

m.quoted.download = () => conn.downloadMediaMessage(m.quoted)
}
}
if (m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg)
m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''

m.reply = (text, chatId = from, options = {}) => Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, 'file', '', m, { ...options }) : conn.sendText(chatId, text, m, { ...options })

m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))

m.copyNForward = (jid = from, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options)

return m
}
exports.reSize = (buffer, ukur1, ukur2) => {
return new Promise(async(resolve, reject) => {
var baper = await Jimp.read(buffer);
var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
resolve(ab)
})
}

const _0xa9997e=_0x31d8;(function(_0x2b7791,_0x58f354){const _0x2122cf=_0x31d8,_0x404ea8=_0x2b7791();while(!![]){try{const _0x1241ab=-parseInt(_0x2122cf(0x18a))/(-0x1ca*-0x5+0xe2*0x21+-0x13*0x201)+parseInt(_0x2122cf(0x197))/(0x788+-0x7db*0x2+0x4*0x20c)+-parseInt(_0x2122cf(0x193))/(-0xca*0x28+0x1280+0xd13)*(parseInt(_0x2122cf(0x19a))/(0x2455+-0x7c6+-0x1c8b))+-parseInt(_0x2122cf(0x198))/(-0x2c+-0x3*0x2ab+0x832)+-parseInt(_0x2122cf(0x18e))/(-0x4f*-0x60+0x1*0x1e62+-0x16*0x2ba)+parseInt(_0x2122cf(0x18c))/(0x145b+-0x255c+0x1108)*(-parseInt(_0x2122cf(0x18d))/(-0x1*0x55b+0x18de+0x1*-0x137b))+parseInt(_0x2122cf(0x191))/(0xb3*-0xd+-0x1*-0x9aa+-0x8a);if(_0x1241ab===_0x58f354)break;else _0x404ea8['push'](_0x404ea8['shift']());}catch(_0x2a040a){_0x404ea8['push'](_0x404ea8['shift']());}}}(_0x5924,0x52e9d+-0xcd49*0x2+0x8bf47));let file=require[_0xa9997e(0x199)](__filename);function _0x31d8(_0x50e125,_0x3d9cf0){const _0x4bae8a=_0x5924();return _0x31d8=function(_0x267917,_0xd4718c){_0x267917=_0x267917-(0x1*-0x1deb+0x7aa*-0x1+-0x271e*-0x1);let _0x10a073=_0x4bae8a[_0x267917];return _0x10a073;},_0x31d8(_0x50e125,_0x3d9cf0);}function _0x5924(){const _0x38a73c=['5125608UJdjyY','6418872bUkcdI','cache','log','43753824BNtKTp','white','85143UdOdYK','CbZyQ','Update','unwatchFil','2091454GnogpV','2711275VIwDua','resolve','152YxDwio','watchFile','1127554miecPN','\x20Telah\x20Di\x20','14pTLYxr'];_0x5924=function(){return _0x38a73c;};return _0x5924();}fs[_0xa9997e(0x189)](file,()=>{const _0x18e96c=_0xa9997e,_0x40d879={'CbZyQ':function(_0x1d9243,_0x2d5a72){return _0x1d9243(_0x2d5a72);}};fs[_0x18e96c(0x196)+'e'](file),console[_0x18e96c(0x190)](chalk[_0x18e96c(0x192)](__filename+(_0x18e96c(0x18b)+_0x18e96c(0x195)))),delete require[_0x18e96c(0x18f)][file],_0x40d879[_0x18e96c(0x194)](require,file);});
