const axios = require('axios');

module.exports.config = {
  name: "hfai",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Replit AI",
  description: "Messenger bot command for Hugging Face AI",
  commandCategory: "No Prefix",
  cooldowns: 0,
};

module.exports.run = async ({ api, event, args, client, __GLOBAL }) => {
  const axios = require('axios');
  const payload = args.join(" ");
  if (!payload) return api.sendMessage("Please provide input for the model.", event.threadID, event.messageID);

  const modelId = "distilbert-base-uncased"; // Replace with your desired model ID
  const apiToken = "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"; // Replace with your actual API token

  const apiUrl = `https://api-inference.huggingface.co/models/${modelId}`;
  const headers = { Authorization: `Bearer ${apiToken}` };

  try {
    const response = await axios.post(apiUrl, { inputs: payload }, { headers });
    const answer = response.data[0]?.generated_text || "I could not get a response.";
    api.sendMessage(answer, event.threadID, event.messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage('Internal Server Error: Unable to access Hugging Face API.', event.threadID, event.messageID);
  }
};