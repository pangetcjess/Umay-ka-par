module.exports.config = {
    name: "autosleep",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Jonell Magallanes",
    description: "Automatically put the bot to sleep at 12AM and send announcement messages to all group chats",
    commandCategory: "System",
    cooldowns: 10,
};

const cron = require("node-cron");

module.exports.run = function({ api, event, client, __GLOBAL }) {
    cron.schedule('0 0 0 * * *', () => {
        api.getThreadList(100, null, ["INBOX"], (err, list) => {
            if (err) return console.log("ERR: " + err);
            list.forEach(thread => {
                if (thread.isGroup && thread.threadID !== list.threadID) {
                    api.sendMessage("Bot has been set to sleep. I'll be back at 5AM.", thread.threadID);
                }
            });
        });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });

    cron.schedule('0 0 5 * * *', () => {
        api.getThreadList(100, null, ["INBOX"], (err, list) => {
            if (err) return console.log("ERR: " + err);
            list.forEach(thread => {
                if (thread.isGroup && thread.threadID !== list.threadID) {
                    api.sendMessage("Bot is waking up and returning for duty.", thread.threadID);
                }
            });
        });
    }, {
        scheduled: true,
        timezone: "Asia/Manila"
    });
};