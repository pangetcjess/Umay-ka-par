const fs = require('fs');
const { join } = require('path');

module.exports.config = {
  name: "harold",
  version: "1.0.0",
  hasPermission: 0,
  description: "Harold bot that can download facebook videos, sing, search image, search lyrics and more..",
  credits: "Deku and Modified by Jonell Magallanes",
  usages: "[help]",
  commandCategory: "Harold Hutchins",
  cooldowns: 1,
};

module.exports.run = async function({ api, event, args }) {
  const commandsPath = join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  const commands = commandFiles.map(file => {
    const command = require(join(commandsPath, file));
    return { name: command.config.name, info: command.config.description, usages: command.config.usages };
  });

  const itemsPerPage = 5;
  let page = parseInt(args[0]) || 1;

  // calculate pagination details
  const totalCommands = commands.length;
  const totalPages = Math.ceil(totalCommands / itemsPerPage);
  page = page < 1 ? 1 : page > totalPages ? totalPages : page; // ensure page is within bounds
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  let helpText = `Command List Of Harold Hutchins Bot:\n\n`;

  // slice commands for the current page
  const commandsToShow = commands.slice(start, end);

  commandsToShow.forEach(command => {
    helpText += ` Name: ${command.name}\n\ Info: 
    Usage: ${command.usages}\n\n`;
  });

  if (page < totalPages) {
    helpText += `Type 'help ${page + 1}' to see the next page of commands.\n\nHAROLD BOT 1.0.0`;
  }

  api.sendMessage(helpText, event.threadID, event.messageID);
}