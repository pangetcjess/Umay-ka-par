module.exports.config = {
    name: "profile",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Prince Sanel",
    description: "Get your profile pic.",
    commandCategory: "Random",
    usages: "noprefix",
    cooldowns: 3,
};
module.exports.run = async({ api, event, args }) => {
	const request = require("request");
	const fs = require("fs");
	try {
		const id = event.senderID;
		let callback = function () {
					api.sendMessage({
						attachment: fs.createReadStream(__dirname + `/cache/2.png`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/2.png`), event.messageID);
				};
				request(encodeURI(`https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname + `/cache/2.png`)).on("close", callback);
			})
    }
    } catch (error) {
    	api.sendMessage("an error occurred", event.theadID, event.messageID);
    }
};