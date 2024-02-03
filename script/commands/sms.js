var request = require("request");

module.exports.config = {
	name: "sms",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Replit AI",
	description: "Send SMS via API",
	commandCategory: "Other",
	cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    var { threadID, messageID } = event;
    var phoneNumber = args[0]; // assuming first argument is phone number
    var message = args.slice(1).join(' '); // taking the rest part as the message

    // adjust this url according to your SMS API provider
    var url = `http://api.smsprovider.com/send.php?username=YOUR_USERNAME&password=YOUR_PASSWORD&to=${phoneNumber}&message=${message}`;

    request(url, function (error, response, body) {
        if(error) {
            api.sendMessage(`Error in sending SMS\n${error}`, threadID, messageID);
        } else {
            api.sendMessage(`SMS sent successfully`, threadID, messageID); 
        }
    });
}