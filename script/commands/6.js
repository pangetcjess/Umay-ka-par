const axios = require("axios");

module.exports.config = {
  name: "areact",
  version: "1.0.0",
  hasPermission: 0,
  credits: "JV Barcenas & cyril", // Created by JV Barcenas & cyril, modified for autoreact
  description: "Automatic reaction based on message context",
  prefix: false,
  commandCategory: "Utilities",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  try {
    const { threadID, messageID, body: message } = event;

    // Define rules to convert message context to reactions
    const contextToReaction = [
      { context: ['love', 'happy', 'beautiful'], reaction: 'LOVE' },
      { context: ['sad', 'sorry', 'upset'], reaction: 'SAD' },
      { context: ['wow', 'amazing', 'incredible'], reaction: 'WOW' },
      { context: ['angry', 'hate', 'furious'], reaction: 'ANGRY' },
      { context: ['funny', 'hilarious', 'joke'], reaction: 'HAHA' },
      { context: ['like', 'agree', 'approve'], reaction: 'LIKE' },
    ];

    let chosenReaction;

    // Determine the reaction based on the message context
    for (const { context, reaction } of contextToReaction) {
      if (context.some(word => message.toLowerCase().includes(word))) {
        chosenReaction = reaction;
        break;
      }
    }

    // Default reaction if no context matches
    if (!chosenReaction) {
      chosenReaction = 'LIKE';
    }

    // React to the message
    await api.changeMessageReaction(chosenReaction, messageID, (err) => {
      if (err) throw err;
      console.log(`Reacted with ${chosenReaction} to messageID: ${messageID}`);
    });

  } catch (error) {
    console.error(`Failed to react to the message: ${error.message}`);
    api.sendMessage(
      `Error: ${error.message}.\nAn error occurred while trying to react, please try again later.`,
      event.threadID
    );
  }
};