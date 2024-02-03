const fs = require("fs");
module.exports.config = {
	name: "pogi",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Remoded by Jonell Magallanes", 
	description: "wala nga prefix jusko naman",
	commandCategory: "No command marks needed",
	usages: "cge na replyan mona",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("pogi")==0 || (event.body.indexOf("Pogi")==0 || (event.body.indexOf("cge na replyan mo na")==0 || (event.body.indexOf("may nag text sayo")==0)))) {
		var msg = {
				body: "cge na. replyan mo na😘",
				attachment: fs.createReadStream(__dirname + `/noprefix/pogi.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}