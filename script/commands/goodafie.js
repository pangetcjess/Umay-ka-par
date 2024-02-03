const fs = require("fs");
module.exports.config = {
	name: "ga",
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
	if (event.body.indexOf("goodafternoon")==0 || (event.body.indexOf("noon")==0 || (event.body.indexOf("afie")==0 || (event.body.indexOf("magandang hapon")==0)))) {
		var msg = {
				body: "Good Afternoon how are you today?",
				attachment: fs.createReadStream(__dirname + `/noprefix/ga.gif`)
			}
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}