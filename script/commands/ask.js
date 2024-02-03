const axios = require('axios');

module.exports.config = {
  name: 'ask',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Ivan Cotacte',
  description: 'An BardAI with Image recognition!',
  usePrefix: false,
  commandCategory: 'chatbots',
  usages: '',
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  const prompt = args.join(' ');
  api.setMessageReaction("⏱️", event.messageID, () => { }, true);
  let credits = this.config.credits;

  if (!prompt) {
    const messages = ["Hello👋", "Oy", "Wassup", "Hey"];
    const message = messages[Math.floor(Math.random() * messages.length)];
    api.sendMessage(message, event.threadID, event.messageID);
    api.setMessageReaction("❤", event.messageID, () => { }, true);
    return
  }

  if (event.type === 'message_reply' && event.messageReply.attachments) {
    const attachment = event.messageReply.attachments[0];
    if (attachment.type === 'photo') {
      const image_url = attachment.url;

      try {
        const response = await axios.post('https://bardpost.tapikej101.repl.co/', {
          message: prompt,
          image_url: image_url,
          credits: credits
        });

        api.sendMessage(response.data.message, event.threadID, event.messageID);
        api.setMessageReaction("✔", event.messageID, () => { }, true);
      } catch (error) {
        console.error('Error:', error);
        api.sendMessage('Error:', error, event.threadID, event.messageID);
        api.setMessageReaction("⚠️", event.messageID, () => { }, true);
      }
      return;
    }
  }

  try {
    const response = await axios.post('https://bardpost.tapikej101.repl.co/', {
      message: prompt,
      credits: credits
    });

    api.sendMessage(response.data.message, event.threadID, event.messageID);
    api.setMessageReaction("✔", event.messageID, () => { }, true);
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage('Error:', error, event.threadID, event.messageID);
    api.setMessageReaction("⚠️", event.messageID, () => { }, true);
  }
};