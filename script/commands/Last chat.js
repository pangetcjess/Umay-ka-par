const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "lastchat",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Jonell Magallanes", 
    description: "",
    commandCategory: "Custom",
    usages: "",
    cooldowns: 5
};

module.exports.handleEvent = async ({ api, event }) => {
    if (event.body.toLowerCase() == "last chat" || 
        event.body.toLowerCase() == "sagip kona" ||
        event.body.toLowerCase() == "lc" || 
        event.body.toLowerCase() == "lastchat") {

        var link = 'https://i.postimg.cc/YqchCdj0/aq-na-last-chat-ako-na-last-chat.gif'; // replace with your image link
        var callback = () => api.sendMessage({ 
                                         body: `Salo ako na last chat haha sorry ha sino ba naman ako i'm just a girl in the village doing alr then i become a princess overnight, it's such an honor`,
                                         attachment: fs.createReadStream(__dirname + "/cache/lastchat.jpg")},
                                         event.threadID, 
                                  
                                         () => fs.unlinkSync(__dirname + "/cache/lastchat.jpg"));
        return request(link).pipe(fs.createWriteStream(__dirname + "/cache/lastchat.jpg")).on("close", callback);       
    }
};

module.exports.run = async function ({ api, event, args }) {

};