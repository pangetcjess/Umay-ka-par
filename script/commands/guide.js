const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "cmdinfo",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell Magallanes",
  description: "Commands info for bot commands",
  commandCategory: "Utilities",
  usages: "guide [CommandName]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const commandName = args[0];
  const commandsFolder = path.join(__dirname, './');
  if (!commandName) {
    let guideMessage = "Commands guide:\n";
    fs.readdirSync(commandsFolder).forEach((file) => {
      if (!file.endsWith('.js') || file === 'guide.js') return;
      let command = require(path.join(commandsFolder, file));
      if (command.config.name) {
        guideMessage += `• ${command.config.name}\n`;
      }
    });
    guideMessage += '\nUse !guide [CommandName] to get detailed information.';
    api.sendMessage(guideMessage, event.threadID);
    return;
  } else {
    let filePath = path.join(commandsFolder, `${commandName}.js`);
    if (fs.existsSync(filePath)) {
      let command = require(filePath);
      let guideMessage = `Details for command: ${commandName}\n` +
        `- Name: ${command.config.name}\n` +
        `- Credits: ${command.config.credits}\n` +
        `- Description: ${command.config.description}\n` +
        `- Category: ${command.config.commandCategory}\n` +
        `- Usages: ${command.config.usages}\n` +
        `- Cooldown: ${command.config.cooldowns} seconds\n`;
      api.sendMessage(guideMessage, event.threadID);
    } else {
      api.sendMessage(`The command '${commandName}' doesn't exist.`, event.threadID);
    }
  }
};