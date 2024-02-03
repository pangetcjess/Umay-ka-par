module.exports.config = {
    name: "restart",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "manhIT",
    description: "restart",
    commandCategory: "system",
    usages: "",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const { threadID, messageID } = event;
    await api.sendMessage('Bot is restarting...', threadID);
    return api.sendMessage('The bot has been restarted.', threadID, () => process.exit(1));
};