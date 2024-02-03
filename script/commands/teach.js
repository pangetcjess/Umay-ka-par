const axios = require('axios');
const fs = require('fs');

module.exports.config = {
    name: "teach",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Jonell Magallanes",
    description: "Teaching the simini command",
    commandCategory: "Fun",
    usages: "teach <message> | <response>",
    cooldowns: 10,
};

module.exports.run = async ({ api, event, args }) => {
    const content = args.join(" ");
    const [ask, ans] = content.split("|").map(item => item.trim());

    // Checking arguments
    if (!ask || !ans) return api.sendMessage('Missing query!', event.threadID);

    const url = `https://sim-api.nakelaqe.repl.co/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`;

    try {
        const response = await axios.get(url);
        if (response.data) {
            api.sendMessage(`successfully teached!\n\nYour Ask: ${ask}\nBot response: ${ans}`, event.threadID);
        } 
    } catch(err) {
        api.sendMessage('Error while teaching', event.threadID);
        console.log(err);
    }
};