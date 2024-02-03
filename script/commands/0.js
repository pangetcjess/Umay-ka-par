const moment = require("moment");

module.exports.config = {
	name: "christmas",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Jonell Magallanes",
	description: "Countdown to Christmas",// malapit na yung Christmas pero walang pera hahaha
	usages: "[christmas]",
	commandCategory: "No Prefix",
	cooldowns: 5,
};

module.exports.handleEvent = function({ api, event }) {
	var { threadID, messageID } = event;

	cron.schedule('* * 10/* * * *', () => {
		api.getThreadList(30, null, ["INBOX"], (err, list) => {
			if (err) return console.log("ERR: "+err);
			list.forEach(now => {
				if (now.isGroup == true && now.threadID != threadID) {
					const today = moment();
					const christmas = moment({ year: today.year(), month: 11, day: 25 });
					if (today.isAfter(christmas)) {
					christmas.add(1, 'years');
					}
					const daysLeft = christmas.diff(today, 'days');
					api.sendMessage(`🎄 | There are ${daysLeft} days until Christmas!`, now.threadID)
				}
			});
		});
	}, {
		scheduled: true,
		timezone: "Asia/Manila"
	});
}

module.exports.run = function({ api, event }) {
	var threadID = event.threadID;
	var messageID = event.messageID;
	var body = event.body;

	const today = moment();
	const christmas = moment({ year: today.year(), month: 11, day: 25 });
	if (today.isAfter(christmas)) {
		christmas.add(1, 'years');
	}
	const daysLeft = christmas.diff(today, 'days');
	api.sendMessage(`There are ${daysLeft} days until Christmas! 🎄`, threadID);
}