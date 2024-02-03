const fs = require("fs");

module.exports.config = {
	name: "lifeupdate",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Your Name",
	description: "Command to send life update reminders",
	commandCategory: "Prefix",
	cooldowns: 0,
};

module.exports.run = function({ api, event, args, client }) {
	const threadID = event.threadID;

	if (!args[0]) return api.sendMessage("Please Provide your text", event.threadID, event.messageID);

	const reminderTime = 24 * 60 * 60 * 1000;

	const currentTime = new Date().getTime();

	const nextReminderTime = currentTime + reminderTime;

	const reminder = {
		threadID: threadID,
		nextReminderTime: nextReminderTime,
	};

	let reminders = [];
	try {
		const data = fs.readFileSync("reminders.json");
		reminders = JSON.parse(data);
	} catch (err) {

	}

	reminders.push(reminder);

	fs.writeFileSync("reminders.json", JSON.stringify(reminders));

	api.sendMessage("📝 | Life update reminder set!", threadID);
};