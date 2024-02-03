module.exports.config = {
	name: "ytvideo",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Prince Sanel",
	description: "Download YouTube link.",
	commandCategory: "Random",
	usages: "[Yt Link]",
	cooldowns: 5,
	
	}; // credit for api: sensui
			
module.exports.run = async ({ api, event, args }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	const req = args[0];
	axios.get(`https://sensui-useless-apis.codersensui.repl.co/api/tools/ytdlmp4?url=${encodeURI(req)}`).then(res => {
	let callback = function () {
					api.sendMessage({
						body: `❯ Downloaded Video From YouTube:`,
						attachment: fs.createReadStream(__dirname + `/cache/ytdl1.mp3`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/ytdl1.mp3`), event.messageID);
				};
				request(res.data.imageUrl).pipe(fs.createWriteStream(__dirname + `/cache/ytdl1.mp3`)).on("close", callback);
			})
    }