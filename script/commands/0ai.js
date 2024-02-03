const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Jonell Magallanes",
    description: "EDUCATIONAL",
    usePrefix: false,
    commandCategory: "other",
    usages: "[question]",
    cooldowns: 10
};

module.exports.run = async function ({ api, event, args }) {
    const content = encodeURIComponent(args.join(" "));
    const apiUrl = `https://ai-chat-gpt-4-lite.onrender.com/api/hercai?question=${content}`;

    if (!content) return api.sendMessage("Please provide your question.\n\nExample: ai what is the solar system?", event.threadID, event.messageID);

    try {
        api.sendMessage("🔍 | AI is searching for your answer. Please wait...", event.threadID, event.messageID);

        const response = await axios.get(apiUrl);
        const { reply, requestNumber } = response.data;

        api.sendMessage(`${reply}\n\n📝 Request count: ${requestNumber}`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
};
