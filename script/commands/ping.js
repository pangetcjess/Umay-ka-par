module.exports.config = {
  name: "ping",
version: "1.0",
  credits: "Jonell Magallanes",
hasPermission: 2,
  description: "Responds with pong and latency",
  usages: "",
commandCategory: "system",
  usePrefix: false,
  cooldowns: 10
};

  module.exports.run = async function ({ api, event }) {
    const startTime = Date.now();
    api.sendMessage('Pong!', event.threadID, (error, messageInfo) => {
      if (error) return console.error(error);
      const endTime = Date.now();
      const latency = endTime - startTime;
      api.sendMessage(`Pong! Latency: ${latency}ms`, event.threadID, messageInfo.messageID);
    });
  };