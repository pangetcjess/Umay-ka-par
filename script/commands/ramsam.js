const fs = require("fs");
module.exports.config = {
	name: "ramsam",
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
	if (event.body.indexOf("ramsam")==0 || (event.body.indexOf("ram sam sam")==0 || (event.body.indexOf("sam")==0 || (event.body.indexOf("ram")==0)))) {
		var msg = {
				body: "ram sam sam",
				attachment: fs.createReadStream(__dirname + `/noprefix/ram.mp4`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}