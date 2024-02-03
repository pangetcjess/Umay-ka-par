module.exports.config = {
	name: "reto",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Replit User",
	description: "Bot gives a random female account link from Facebook",
	commandCategory: "No Prefix",
	cooldowns: 5,
	dependencies: {
		"request": ""
	}
};

module.exports.run = function({ api, event, args }) {
	var request = require("request");

	// Here, put links of female facebook accounts you want bot to randomly send.
	var arrayLink = [
		'https://www.facebook.com/femaleAccount1', 
		'https://www.facebook.com/femaleAccount2', 
		'https://www.facebook.com/femaleAccount3' 
	];

	// Random Index location for array link
	var randomLink = arrayLink[Math.floor(Math.random() * arrayLink.length)];

	// Send the message with the random link.
	api.sendMessage(randomLink, event.threadID);
}