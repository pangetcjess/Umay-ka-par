const fs = require('fs');

module.exports.config = {
    name: 'adminbot',
    version: '1.0.0',
    hasPermission: 2,
    credits: 'Jonell Magallanes',
    description: 'Toggle adminOnly in config',
    commandCategory: 'system',
    cooldowns: 5,
};

module.exports.run = async function({ api, event, args, client, __GLOBAL }) {
    let configPath = './config.json'; 
    let rawData = fs.readFileSync(configPath);
    let jsonData = JSON.parse(rawData);

    if (args[0] === 'on') {
        jsonData.adminOnly = true;
        api.sendMessage('✅ | AdminOnly set to true.', event.threadID);
    } else if (args[0] === 'off') {
        jsonData.adminOnly = false;
        api.sendMessage('✅ | AdminOnly set to false.', event.threadID);
    } else {
        api.sendMessage('Only "on" or "off" values are accepted.', event.threadID);
        return;
    }

    // Write the updated adminOnly status to config.json
    fs.writeFileSync(configPath, JSON.stringify(jsonData, null, 2));

    console.log('Bot is restarting...');
    process.exit(1);
};