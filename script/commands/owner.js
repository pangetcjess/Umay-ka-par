const fs = require("fs");
module.exports.config = {
	name: "owner",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Long LTD", 
	description: "no prefix",
	commandCategory: "prefix",
	usages: "OWNER ",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("?owner")==0 || (event.body.indexOf("sino owner ng bot?")==0 || (event.body.indexOf("?jonell")==0 || (event.body.indexOf("?detail")==0)))) {
		var msg = {
				body: "OWNER BOT INFORMATION\n\n\nNAME:JONELL MAGALLANES\n\nGENDER:MALE\n\nAGE: 17\n\nFACEBOOK OWNER:https://www.facebook.com/propertynilove.magallnes\n\nthankyou for using this bot😘",
				attachment: fs.createReadStream(__dirname + `/noprefix/owner.png`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

                                                                                          }