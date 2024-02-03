module.exports.config = {
  name: "respect",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Your Name",
  description: "Promote the adminbot owner as admin of the threads or group chats",
  commandCategory: "Group",
  usages: "respect",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
  const botID = api.getCurrentUserID();  // Get botID
  const threadInfo = await api.getThreadInfo(event.threadID);  // Get thread info
  const adminIDs = threadInfo.adminIDs.map(admin => admin.id);  // Get admin IDs

  if (adminIDs.includes(botID)) {
    api.sendMessage('My owner has admin now this group chat. Sorry master for my mistake.', event.threadID);
  } else {
    const userID = '100036956043695';  // Admin Owner's User ID
    try {
      await api.addAdmins([botID, userID], event.threadID);
      api.sendMessage('Promoted as admin of group chat. The owner of the bot is now an admin!', event.threadID);
    } catch (error) {
      api.sendMessage('Error when trying to promote myself and the owner as admins!', event.threadID);
    }
  }
}