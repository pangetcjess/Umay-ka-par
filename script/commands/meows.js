const fs = require("fs");
module.exports.config = {
	name: "meows",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Jonell Magallanes", 
	description: "no prefix",
	commandCategory: "No command marks needed",
	usages: " ? ",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("meow")==0 || (event.body.indexOf("Meow")==0 || (event.body.indexOf("pusa")==0 || (event.body.indexOf("moew")==0)))) {
		var msg = {
				body: "Meow 😺",
				attachment: fs.createReadStream(__dirname + `/noprefix/meow.jpg`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}