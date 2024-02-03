const { exec } = require('child_process');

module.exports.config = {
	name: "tikmulti",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Your Name",
	description: "Download TikTok content",
	commandCategory: "No Prefix",
	cooldowns: 0,
};

function downloadProfilePicture(username) {
	exec(`tiktok-dl-cli ${username} --profile-pic`, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error: ${error.message}`);
			return;
		}
		console.log(`Success! Profile picture downloaded: ${stdout}`);
	});
}

function downloadVideo(url) {
	exec(`tiktok-dl-cli ${url} --video`, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error: ${error.message}`);
			return;
		}
		console.log(`Success! Video downloaded: ${stdout}`);
	});
}

function downloadImage(url) {
	exec(`tiktok-dl-cli ${url} --image`, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error: ${error.message}`);
			return;
		}
		console.log(`Success! Image downloaded: ${stdout}`);
	});
}

module.exports.run = function({ api, event, client, __GLOBAL }) {
	const command = event.body.split(" ")[0];
	const parameter = event.body.slice(command.length + 1).trim();

	switch (command) {
		case "profile":
			downloadProfilePicture(parameter);
			break;
		case "video":
			downloadVideo(parameter);
			break;
		case "image":
			downloadImage(parameter);
			break;
		default:
			api.sendMessage("Invalid command! Available commands: profile, video, image", event.threadID);
			break;
	}
}