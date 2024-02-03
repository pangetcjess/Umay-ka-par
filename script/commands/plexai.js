const fetch = require('node-fetch');

module.exports.config = {
	name: "aiseo",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Your Name",
	description: "Rephrase a message",
	commandCategory: "No Prefix",
	cooldowns: 0,
};

module.exports.run = function({ api, event }) {
	const message = event.body;
	
	fetch("https://api.aiseo.ai/v2/rewrite", {
		method: 'POST',
		headers: {
			'Authorization': "Bearer dRBLZFRCk0VlDwSUs29jClRfiZWDHB+MsLLS9+iNpXPOShYEVnu5TouvAeq1wz16cQOISut9M8zX4FVJwzdGLRMWSPm83YXeMa+nplmxuiI=",
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			text: message,
			audience: "general",
			formality: "neutral",
			intent: "inform"
		})
	})
		.then((resp) => resp.json())
		.then((data) => {
			const responseText = "Your rephrased message: " + data.text;
			api.sendMessage(responseText, event.threadID);
		})
		.catch(console.log);
}