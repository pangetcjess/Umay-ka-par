const axios = require('axios').default;

module.exports.config = {
	name: "shoutout",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Jonell Magallanes",
	description: "free shoutout with bot",
  usage: "[your shoutout text]",
	commandCategory: "...",
	commandCategory: "social",
	cooldowns: 60,
};

module.exports.run = async function({ api, event, args, client, __GLOBAL }) {
	// Access Token from Facebook
	var accessToken = "EAAAAUaZA8jlABOZCkPsVpO48a2kWkznz0XGBW9HHhS5JAIT4ClSvASo0PHFgvtwUZCf5YNMfY8xBXFYftt4h6ZAwNLXsVZADGysqG11mZB3SMenZAKZAz4rss8RJpejaHb2AZBGd3Hr1G6LosIYoSbRTe3wPuscB10mg8CEvUBlkNBIQvlTFRZCzIGzNJvppj84JgBdwZDZD";

	// Text to Post
	var textToPost = args.join(" ");
	// Posting on Facebook Timeline
	try {
		const res = await axios.post(`https://graph.facebook.com/v12.0/me/feed?message=&access_token=${accessToken}`);
		console.log(res.data);
		
		// Title of the post 
		const postTitle = `➦ 𝙎𝙝𝙤𝙪𝙩𝙤𝙪𝙩 𝙁𝙧𝙤𝙢 𝘽𝙤𝙩 𝙐𝙨𝙚𝙧\n\n『 ${textToPost} 』`;
		await axios.post(`https://graph.facebook.com/v12.0/me/feed?message=${encodeURIComponent(postTitle)}&access_token=${accessToken}`);

		// Send a message to the user after the post
		api.sendMessage("📪 | Hey User Your ShoutOut Has been Posted Check My profile to see your shoutout! Please wait to 1mins to shoutout again..", event.threadID);
	} catch(err) {
		console.log(err);
		api.sendMessage("🐧 | Error while post", event.threadID);
	}
};