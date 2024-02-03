const axios = require('axios');

module.exports.config = {
  name: "mistralAI",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JONELL MAGALLANES",// CREDIT THE API
  description: "ASKING QUESTIONS WITH MISTRAL AI",
  commandCategory: "general",
  usage: "mistralAI [your_question]",
  cooldowns: 5,
};

module.exports.run = async ({ event, api }) => {
  const query = encodeURI(event.body.slice(event.body.indexOf('mistralAI') + 10).trim());
  const apiUrl = `https://ai.easy-api.repl.co/api/mistral?query=${query}`;

  try {
    let response = await axios.get(apiUrl);
    if (response.status === 200 && response.data && response.data.content) {
      api.sendMessage(response.data.content, event.threadID, event.messageID);
    } else {
      api.sendMessage(
        'There was an error with the request, or the format has changed.',
        event.threadID,
        event.messageID
      );
    }
  } catch (error) {
    api.sendMessage('Error when requesting the AI server: ' + error.message, event.threadID, event.messageID);
  }
};