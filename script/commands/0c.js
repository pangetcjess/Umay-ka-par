const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();

module.exports.config = {
  name: "cai",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell Magallanes",
  description: "Chat with AI using GPT-3.5",
  usePrefix: false,
  commandCategory: "ai",
  usages: "cai [your question]",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  // Authenticating as a guest (use `.authenticateWithToken()` to use an account)
  await characterAI.authenticateAsGuest();

  // Place your character's id here
  const characterId = "O--kj9nCaQt9yV-RrN_yBxIQpzbry9icRAyl7m2BdEY";

  const chat = await characterAI.createOrContinueChat(characterId);

  // Send a message
  const query = encodeURIComponent(args.join(" "));
  const response = await chat.sendAndAwaitResponse(query, true);

  // Send the AI's response using api.sendMessage
  api.sendMessage(response.text, event.threadID);
};
