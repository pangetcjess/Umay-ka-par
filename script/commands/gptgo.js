const axios = require("axios");

module.exports.config = {
  name: "gptgo2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jonell Magallanes",
  description: "asking questions without prefix or command",
  usePrefix: false,
  commandCategory: "ai",
  usages: "[ask]",
  cooldowns: 2
};

module.exports.run = async function ({ api, event, args }) {
  const gptEnabled = true; // Moved gptEnabled inside the function for better encapsulation

  if (gptEnabled) {
    const { messageID, threadID, senderID, body } = event;
    const content = encodeURIComponent(body);

    try {
      const res = await axios.get(`https://ai-chat-gpt-4-lite.onrender.com/api/hercai?question=${content}`);
      const respond = res.data.reply;
      const requestNumber = res.data.requestNumber;

      if (res.data.error) {
        api.sendMessage(`Error: ${res.data.error}`, threadID, messageID);
      } else {
        api.sendMessage(`${respond}\n\n📝 Request count: ${requestNumber}`, threadID, messageID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("An error occurred while fetching the data.", threadID, messageID);
    }
  }
};

module.exports.handleEvent = async function ({ api, event }) {
  const gptEnabled = true; // Moved gptEnabled inside the function for better encapsulation

  if (gptEnabled) {
    const { threadID, messageID, senderID, body } = event;

    if (body.endsWith("?")) {
      return this.run({ api, event, args: [body] });
    }
  }
};

module.exports.turnGptOn = function () {
  gptEnabled = true; // This change ensures that the gptEnabled variable is accessible within the scope of the turnGptOn function
};

module.exports.turnGptOff = function () {
  gptEnabled = false; // This change ensures that the gptEnabled variable is accessible within the scope of the turnGptOff function
};
