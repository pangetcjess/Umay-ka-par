const fs = require("fs");
module.exports.config = {
	name: "gm",
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
	if (event.body.indexOf("goodmorning")==0 || (event.body.indexOf("morning")==0 || (event.body.indexOf("gomo")==0 || (event.body.indexOf("gm")==0)))) {
		var msg = {
				body: "Good Morning hello have nice day idol🌞",
				attachment: fs.createReadStream(__dirname + `/noprefix/gomo.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}