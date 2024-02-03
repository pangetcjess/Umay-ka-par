// Command 'uptimerbot'
module.exports.config = {
  name: "uptimerbot",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Your Name",
  description: "Uptime Bot",
  commandCategory: "Commands",
  cooldowns: 0,
};

const axios = require("axios");

module.exports.run = async function({ api, event, args }) {
  if (!args[0]) return api.sendMessage("📝 | Please enter a URL to want uptime", event.threadID, event.messageID);
  const apiKey = "u2094844-8a9a55dfb0a6475becf1630e";
  const monitorURL = args[0];

  try {
    const response = await axios.get(`https://api.uptimerobot.com/v2/getMonitors?api_key=${apiKey}`);
    // Process the response data as needed
    // ...

    api.sendMessage(`✅ | Uptime Bot is running!\n\nLink: ${monitorURL}`, event.threadID, event.messsageID);
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while checking uptime.", event.threadID);
  }
}