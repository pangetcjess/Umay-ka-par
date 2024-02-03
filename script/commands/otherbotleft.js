module.exports.config = {
  name: "otherbotleft",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jonell Magallanes", //modified
  description: "Leave the group if another bot is detected",
 usages: "...",
  commandCategory: "Ulitily",
  cooldowns: 0
};

module.exports.handleEvent = async ({ event, api, Users }) => {
  const { threadID, body: message, senderID } = event;

  // Check if the sender is the current bot, to prevent the bot from responding to itself
  if (senderID === api.getCurrentUserID()) return;

  // Define identifiers for other bots' messages
  const botIndicators = [
    "your keyboard level has reached level",
    "Command not found",
    "The command you used",
    "Uy may lumipad",
    "Unsend this message",
    "You are unable to use bot",
    "»» NOTICE «« Update user nicknames",
    "just removed 1 Attachments",
    "message removedcontent",
    "The current preset is",
    "Here Is My Prefix",
    "just removed 1 attachment.",
    "Unable to re-add members"
  ];

  // Check if the message contains any of the indicators
  let isOtherBotMessage = botIndicators.some(indicator => message.includes(indicator));

  if (isOtherBotMessage) {
    console.log("[ OTHER BOT DETECTED ]", await Users.getNameUser(senderID));
    // Send final message before leaving the group
    api.sendMessage("OtherBot Detected Of this group chat permission to left this thread!", threadID, () => {
      // Exit the group after sending the message
      api.removeUserFromGroup(api.getCurrentUserID(), threadID)
        .catch(err => console.error(err));
    });
  }
};

// run function is not needed and has been removed in this code