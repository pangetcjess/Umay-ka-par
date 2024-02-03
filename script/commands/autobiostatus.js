module.exports.config = {
	name: "autobiostatus",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Jonell",
	description: "Bot sets its own bio and report when it is active",
	commandCategory: "No Prefix",
	cooldowns: 0,
};

const cron = require("node-cron");
const moment = require("moment-timezone");
const prefix = "?"; // Your bot's prefix
const botName = "Harold Hutchins";
const ownerName = "Jonell Magallanes";

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
  
	// Every hour
	cron.schedule('* * * * *', () => {
		var currentTime = moment().tz('Asia/Manila');
		var currentHour = currentTime.format('HH');
		var bioMessage;

		if(currentHour >= 8 && currentHour <= 11){
			bioMessage = `Good morning! I'm ${botName}, currently active. Owner: ${ownerName}. Time: ${currentTime} `;
		}else if(currentHour >= 12 && currentHour <= 18){
			bioMessage = `Good afternoon! I'm ${botName}, currently active. Owner: ${ownerName}. Time: ${currentTime}`;
		}else{
			bioMessage = `Hello! I'm ${botName}, currently active. Owner: ${ownerName}. Time: ${currentTime}`;
		}
		
		api.changeBio(bioMessage, (err) => {
		  if (err) return console.error('ERR:', err);
		});
	});

}

module.exports.run = function({ api, event }) {
    let currentTime = moment().tz('Asia/Manila').format('MMM Do, h:mm:ss a');

    api.changeBio(`Hey I'm ${botName}, currently active. Owner: ${ownerName}. Time: ${currentTime}`, (e) => {
       if (e) api.sendMessage("An error occurred" + e, event.threadID); 
       return api.sendMessage("Changed bot's profile to", event.threadID, event.messageID);
    });
}