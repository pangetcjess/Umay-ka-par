const request = require("axios");
const cheerio = require("cheerio");

module.exports.config = {
	name: "dafonts",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Your Name",
	description: "Direct download Dafonts with search Query",
	commandCategory: "No Prefix",
	cooldowns: 0,
}

module.exports.run = async function({ api, event, args }) {
    const searchQuery = args.join(" ");
    const response = await request.get(`https://www.dafont.com/search.php?q=${encodeURI(searchQuery)}`);
    const $ = cheerio.load(response.data);
    const firstFontUrl = $("div.dlv a").first().attr("href");
    if (firstFontUrl) {
        api.sendMessage(`Here is the link to download the first font for your query "${searchQuery}":\nhttps://www.dafont.com${firstFontUrl}`, event.threadID);
    } else {
        api.sendMessage(`No fonts found for search query "${searchQuery}"`, event.threadID);
    }
}