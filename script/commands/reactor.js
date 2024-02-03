const fs = require("fs");
module.exports.config = {
        name: "autoreact",
  version: "1.0.0",
        hasPermssion: 0,
        credits: "Minami Tatsuo",
        description: "\u0041\u0075\u0074\u006f \u0072\u0065\u0061\u0063\u0074\u0069\u006f\u006e \u006d\u0061\u0064\u0065 \u0062\u0079 \u004d\u0069\u006e\u0061\u006d\u0069 \u0054\u0061\u0074\u0073\u0075\u006f",
        commandCategory: "no prefix",
        usages: "noprefix",
    cooldowns: 0,
};
 
module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
 let haha = event.body.toLowerCase();
  if (this.config.credits != '\u004d\u0069\u006e\u0061\u006d\u0069 \u0054\u0061\u0074\u0073\u0075\u006f') {
        console.log('\x1b[33m[ WARN ]\x1b[37m » \u0043\u0072\u0065\u0064\u0069\u0074\u0073 \u0068\u0061\u0073 \u0062\u0065\u0065\u006e \u0063\u0068\u0061\u006e\u0067\u0065\u0064\u0021 \u0053\u0074\u006f\u0070 \u004e\u006f\u0077\u0021'+ global.config.BOTNAME + ' đổi credits modules "' + this.config.name + '"');
        return api.sendMessage('[ WARN ] \u0053\u0054\u004f\u0050 \u0043\u0048\u0041\u004e\u0047\u0049\u004e\u0047 \u0043\u0052\u0045\u0044\u0049\u0054\g \u0049\u0044\u0049\u004f\u0054 ' , event.threadID, event.messageID);
      }
  if (haha.includes("lol") || haha.includes("lmao") || haha.includes("haha") || haha.includes("xd") || haha.includes("puta") || haha.includes("gagu") || haha.includes("tanga") || haha.includes("tanginamo") || haha.includes("hayup") || haha.includes("bobo") || haha.includes("iyot") || haha.includes("eut") || haha.includes("kantot") || haha.includes("gago")){
                 return api.setMessageReaction("😆", event.messageID, (err) => {}, true)
    api.markAsSeen(1, (err) => {});
  }
    if (haha.includes("aray") || haha.includes("hays") || haha.includes("sakit") || haha.includes("ouch") || haha.includes("hurt") || haha.includes("please") || haha.includes("😢") || haha.includes("😔") || haha.includes("🥺") || haha.includes("sad")){
      return  api.setMessageReaction("😢", event.messageID, (err) => {}, true);
}
  if (haha.includes("wow") || haha.includes("luh") || haha.includes("sheesh") || haha.includes("damn") || haha.includes("yes") || haha.includes("weh") || haha.includes("loh") || haha.includes("hala") || haha.includes("lah") || haha.includes("what") || haha.includes("omg")){
    return api.setMessageReaction("😮", event.messageID, (err) => {}, true)
        }
  if (haha.includes("nigga") || haha.includes("nigg")){
    api.setMessageReaction("nigger", event.messageID, (err) => {}, true)
    api.sendMessage("RACIST!!", event.threadID,event.messageID);
  }
  if (haha.includes("bot") || haha.includes("robot")){
    api.sendMessage("I'm here baby", event.threadID, event.messageID)
  }
  if (haha.includes("ferson") || haha.includes("forda")){
    api.sendMessage("ferson typing ampota", event.threadID, event.messageID)
  }
  if (haha.includes("saan") || haha.includes("saan ka punta")){
    api.sendMessage("To the moon", event.threadID, event.messageID)
  }
if (haha.includes("to the moon") || haha.includes("moon")){
    api.sendMessage("roadtrip", event.threadID, event.messageID)
}
if (haha.includes("roadtrip") || haha.includes("road")){
    api.sendMessage("broom broom", event.threadID, event.messageID)
}
  if (haha.includes("skr") || haha.includes("skkr")){
    api.sendMessage("sa fake, no room", event.threadID, event.messageID)
}
  if (haha.includes("pa copylink") || haha.includes("visit")){
    api.sendMessage("sa fak", event.threadID, event.messageID)
      }
        module.exports.run = function({ api, event, client, __GLOBAL }) {
          }