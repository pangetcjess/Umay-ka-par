module.exports.config = {
    name: "lockdown",
    version: "1.0.0",
    hasPermission: 2,
    credits: "Replit AI",
    description: "",
    commandCategory: "Utility",
    usages: "[on/off]",
    cooldowns: 5
};

var lockdown = {};

module.exports.handleEvent = function({ api, event }) {
    if (!Object.keys(lockdown).includes(String(event.threadID))) return;
    if (event.senderID == api.getCurrentUserID()) return;
    if (lockdown[String(event.threadID)]) {
api.sendMessage("⏱️ | You kicked from the group due Lockdown Mode is Activated", event.threadID, event.messageID);   api.removeUserFromGroup(event.senderID, event.threadID);
        api.addUserToGroup({
            userID: event.senderID,
            threadID: event.threadID,
            role: "MEMBER"
        });
    }
};

module.exports.onLoad = function() {
    const { readFileSync, existsSync, writeFileSync } = require("fs");
    if (existsSync(__dirname + "/cache/lockdown.json")) {
        lockdown = JSON.parse(readFileSync(__dirname + "/cache/lockdown.json"));
    } else {
        writeFileSync(__dirname + "/cache/lockdown.json", JSON.stringify({}), 'utf-8');
    }
};

module.exports.run = function({ api, event, args }) {
    const { writeFileSync } = require("fs");
    if (!(String(event.threadID) in lockdown)) lockdown[String(event.threadID)] = false;
    if (args[0] == "off") {
        lockdown[String(event.threadID)] = false;
    } else if (args[0] == "on") {
        lockdown[String(event.threadID)] = true;
    } else {
        return api.sendMessage('📝 | Use the command: "lockdown on" to enable or "lockdown off" to disable lockdown mode.', event.threadID);
    }
    writeFileSync(__dirname + "/cache/lockdown.json", JSON.stringify(lockdown), 'utf-8');
    return api.sendMessage(`✅ | You have successfully turned ${lockdown[String(event.threadID)] ? "on" : "off"} the Lockdown mode for this group! \n⚠️ Noted:\nYou want to remove as admin the bot if you want to off the lockdown mode`, event.threadID);
};