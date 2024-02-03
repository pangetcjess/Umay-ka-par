const fs = require("fs");
module.exports.config = {
	name: "hoy",
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
	if (event.body.indexOf("Hoyy")==0 || (event.body.indexOf("hoy")==0 || (event.body.indexOf("hoyy")==0 || (event.body.indexOf("wag kayo mang babato sa bahay namin")==0)))) {
		var msg = {
				body: "Hoyy😾",
				attachment: fs.createReadStream(__dirname + `/noprefix/hoy.mp3`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}