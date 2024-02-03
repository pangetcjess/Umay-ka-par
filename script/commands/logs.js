module.exports.config = {
    name: "logs",
    version: "1.0.0",
    hasPermission: 0,
    credits: "You or Your Team",
    description: "Send logs of settings updates",
    commandCategory: "system",
    cooldowns: 5,
};

module.exports.handleEvent = async ({ api, event }) => {
    if (event.logMessageType) {
        let logText;

        switch (event.logMessageType) {
            case 'log:thread-name':
                logText = `Chat's name has been changed to ${event.logMessageData.name}`;
                break;
            case 'THREAD_IMAGE':
                logText = 'Chat\'s image has been updated';
                break;
            case 'thread-color':
                logText = 'Chat\'s color has been updated';
                break;
            case 'nickname':
                logText = `Nickname of ${event.logMessageBody.split(' set ')[1].split(' nickname to ')[0]} is now ${event.logMessageData.nickname}`;
                break;
            case 'log:admin':
                logText = `${event.logMessageData['log:admin'][0].text} has been promoted as admin`;
                break;
            case 'log:admin':
                logText = `${event.logMessageData['ADMIN_EVENT_DATA.REMOVED_ADMINS'][0].text} has been demoted from admin role`;
                break;
            case 'log:thread-emoji':
                logText = 'Chat\'s emoji has been updated';
                break;
            case 'CALL_STARTED':
                logText = 'Video call has been started';
                break;
            case 'CALL_ENDED':
                logText = 'Video call has ended';
                break;
            default:
                logText = 'Unrecognized change in chat settings';
                break;
        }

        if (logText) {
            api.sendMessage(logText, event.threadID);
        }
    }
};

module.exports.run = async () => {};