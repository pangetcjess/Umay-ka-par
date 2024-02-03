const fs = require("fs");
module.exports.config = {
	name: "goodnight",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Long LTD moded by jonell", 
	description: "no prefix",
	commandCategory: "No command marks needed",
	usages: "Goodnight pogi   ",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("goodnight")==0 || (event.body.indexOf("night")==0 || (event.body.indexOf("good night")==0 || (event.body.indexOf("nyt")==0)))) {
		var msg = {
				body: "Sleepwell po idol sana maganda gising mo bukas🤭",
				attachment: fs.createReadStream(__dirname + `/noprefix/goodnight.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}