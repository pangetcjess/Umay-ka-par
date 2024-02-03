const fs = require("fs");
module.exports.config = {
	name: "ge",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Long LTD", 
	description: "no prefix",
	commandCategory: "No command marks needed",
	usages: "Goodbye Grandpa    ",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("goodevening")==0 || (event.body.indexOf("eve")==0 || (event.body.indexOf("evening")==0 || (event.body.indexOf("magandang gabi")==0)))) {
		var msg = {
				body: "Good Evening idol😘",
				attachment: fs.createReadStream(__dirname + `/noprefix/ge.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}