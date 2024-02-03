const fs = require("fs");
const path = require("path");

module.exports.config = {
    name: "pollchat",
    version: "1.0.0",
    hasPermission: 1,
    credits: "Jonell Magallanes",
    description: "Poll members to vote on turning chat off or on",
    commandCategory: "Risk",
    usages: "[on/off]",
    cooldowns: 5
};

let chatPoll = {};

module.exports.handlePollEvent = async function({ api, event }) {
    if (!chatPoll[event.threadID]?.isPollActive) return;

    const threadInfo = await api.getThreadInfo(event.threadID);
    const botId = api.getCurrentUserID();

    // If chat is active, remove a member if they don't vote, except admins and the bot itself
    let senderId = event.senderID;
    if (event.body.toLowerCase() === "vote" && chatPoll[event.threadID].usersToVote[senderId]) {
        delete chatPoll[event.threadID].usersToVote[senderId];
        api.sendMessage(`Thank you for your vote, ${await getUserName(api, senderId)}.`, event.threadID);
    } else if (Object.keys(chatPoll[event.threadID].usersToVote).length > 0 && senderId !== botId && !threadInfo.adminIDs.some(adminInfo => adminInfo.id === senderId)) {
        api.removeUserFromGroup(senderId, event.threadID);
    }
};

function getUserName(api, senderID) {
    // Placeholder for actual implementation of getUserName function
}

module.exports.run = async function({ api, event, args }) {
    const pollChatPath = path.join(__dirname, "/cache/chatPoll.json");

    if (!fs.existsSync(pollChatPath)) {
        fs.writeFileSync(pollChatPath, JSON.stringify({}), 'utf-8');
    } else {
        chatPoll = JSON.parse(fs.readFileSync(pollChatPath, 'utf-8'));
    }

    if (!(event.threadID in chatPoll)) chatPoll[event.threadID] = { isPollActive: false, usersToVote: {} };

    const threadInfo = await api.getThreadInfo(event.threadID);
    const isAdmin = threadInfo.adminIDs.some(adminInfo => adminInfo.id === event.senderID);

    // Only admins allowed to start a poll
    if (!isAdmin) return api.sendMessage("Admin privilege is required to start a chat poll.", event.threadID);

    if (args[0] === "on") {
        if (!chatPoll[event.threadID].isPollActive) {
            chatPoll[event.threadID].isPollActive = true;
            threadInfo.participantIDs.forEach(userID => {
                if (!threadInfo.adminIDs.some(adminInfo => adminInfo.id === userID)) {
                    chatPoll[event.threadID].usersToVote[userID] = true;
                }
            });
            fs.writeFileSync(pollChatPath, JSON.stringify(chatPoll), 'utf-8');
            api.sendMessage('Poll to turn chat on has started. Please send "vote" to vote for turning chat on, otherwise you will be removed from the group.', event.threadID);
        } else return api.sendMessage("A poll is already active.", event.threadID);
    } else if (args[0] === "off") {
        if (chatPoll[event.threadID].isPollActive) {
            chatPoll[event.threadID].isPollActive = false;
            fs.writeFileSync(pollChatPath, JSON.stringify(chatPoll), 'utf-8');
            api.sendMessage('Poll has ended.', event.threadID);
        } else return api.sendMessage("A poll is not active.", event.threadID);
    } else {
        return api.sendMessage("Use 'pollchat on' to start a poll to turn chat on or 'pollchat off' to disable a poll and activate chat off.", event.threadID);
    }
};