const fs = require("fs");
module.exports.config = {
	name: "naol",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Jonell Magallanes", 
	description: "walang prefix",
	commandCategory: "No command marks needed",
	usages: "...",
    cooldowns: 1, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("naol")==0 || (event.body.indexOf("Sana all")==0 || (event.body.indexOf("sabaok")==0 || (event.body.indexOf("Naol")==0) ||(event.body.indexOf("Sana all"))))==0                          {      
    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Manila").format("HH:mm:ss || D/MM/YYYY");
		var msg = {
				body: `(2) dahil napapa sana all ako`
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

      }