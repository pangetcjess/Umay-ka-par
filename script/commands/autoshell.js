const { exec } = require('child_process');
const cron = require('node-cron');

module.exports.config = {
  name: "autoshell",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "Jonell Magallanes", // (botpack) if change mo yung credits bahala ka ana sa buhay umay par :<
  description: "auto shell",
  usePrefix: true,
  commandCategory: "admin",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const command = args.join(" ");

  if (!command) {
    return api.sendMessage("Please provide a command to execute.", event.threadID);
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return api.sendMessage(`An error occurred while executing the command: ${error.message}`, event.threadID);
    }

    if (stderr) {
      console.error(`Command execution resulted in an error: ${stderr}`);
      return api.sendMessage(`Command execution resulted in an error: ${stderr}`, event.threadID);
    }

    console.log(`Command executed successfully:\n${stdout}`);
    api.sendMessage(`Command executed successfully:\n${stdout}`, event.threadID);
  });
};

cron.schedule('*/45 * * * *', () => {
  const scheduledCommand = 'npx pm2 start index.js';

  exec(scheduledCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing scheduled command: ${error}`);
    } else if (stderr) {
      console.error(`Scheduled command resulted in an error: ${stderr}`);
    } else {
      console.log(`Scheduled command executed successfully:\n${stdout}`);
    }
  });
});
