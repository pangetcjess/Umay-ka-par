module.exports.config = {
  name: "tempban",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Joshua sy",
  description: "otherbot",
  commandCategory: "...",
  cooldowns: 0,
  banDuration: 1000 * 60 * 60 // 1 hour
};

module.exports.handleEvent = async ({
  event: o,
  api: t,
  Users: n
}) => {
  var {
    threadID: e,
    messageID: a,
    body: b,
    senderID: s,
    reason: d
  } = o;

  const i = require("moment-timezone").tz("Asia/Manila").format ("h:mm:ss A");
  const moment = require("moment-timezone");
  const Date = moment.tz("Asia/Manila").format("DD/MM/YYYY");
  const unbanDate = moment().add(1, 'hours').tz("Asia/Manila").format("h:mm:ss A DD/MM/YYYY");

  if (s == t.getCurrentUserID()) return;

  let c = await n.getNameUser(o.senderID);
  var h = {
    body: `${c}, you are banned for swearing at the bot. Your ban will be lifted at ${unbanDate}`
  };

  // Add curse words without capital letters
  ["bobong bot", "bobo bot", "tangang bot", "inutil na bot", "tanga tangang bot", "bobot", "stupid bot", "dumb bot", "tanga yung bot", "gagong bot", "Bobong bot", "Bobo bot", "botbot", "bobo nung bot", "walang alam na bot", "tanga mong bot", "kick yung bot", "botlog bot"]
    .forEach(a => {
      if (b.toLowerCase().includes(a.toLowerCase())) {
        const user = n.getData(s).data || {};
        user.banned = 1, 
        user.reason = a || null, 
        user.dateBanned = i, 
        global.data.userBanned.set(s, {
          reason: user.reason,
          dateBanned: user.dateBanned
        }), 

        setTimeout(() => {
          user.banned = 0;
          user.reason = null;
          t.sendMessage(`${c}, Your temp ban has been lifted.`, e);
        }, this.config.banDuration);

        t.sendMessage(h, e);
      }
    })
},

module.exports.run = async ({
	event: o,
	api: t
}) => {
  if (global.data.userBanned.has(o.senderID)) {
    const { reason, dateBanned } = global.data.userBanned.get(o.senderID);
    return t.sendMessage(`You cannot use bot now. You're temporarily banned for the reason: ${reason} 
    Your ban will be lifted at ${dateBanned}.`, o.threadID);
  }

  t.sendMessage("This command is used to detect when swearing to bot.", o.threadID);
};