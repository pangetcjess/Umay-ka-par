const axios = require('axios');

module.exports.config = {
	name: "apiMarket",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Jonell Magallanes",
	description: "Search API endpoints via market command",
	commandCategory: "Market",
	cooldowns: 5,
	dependencies: {
		"axios": ""
	}
};

module.exports.run = async ({ api, event, args }) => {
	const query = args.join(" ");
	if (!query) return api.sendMessage("Please provide search keywords.", event.threadID);

	const apiUrl = `https://api-market-by-jonell-cc.hutchin.repl.co/market/?search=${encodeURIComponent(query)}`;

	try {
		const response = await axios.get(apiUrl);
		const searchResults = response.data;

		if (searchResults.length === 0) {
			return api.sendMessage("No results found for your search.", event.threadID);
		}

		let message = '🛒 Market Api Search Results:\n\n';
		searchResults.forEach((result, index) => {
			// Replace dots with 🐧 in the endpoint link
			const endpoint = result.link.split('.').join('🐧');
			message += `${index + 1}. Name:${result.name}\n\nDescription:${result.description}\n\nEndpoint: ${endpoint}\n\nApiOwner:${result.ApiOwner}\n\n==============================\n\n`;
		});

		api.sendMessage(`${message}\n\nRemove the 🐧 and Replace the .`, event.threadID);
	} catch (error) {
		console.error(error);
		api.sendMessage("An error occurred while trying to search the market.", event.threadID);
	}
};