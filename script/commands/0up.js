const ping = require('ping');

module.exports.config = {
    name: "uptime",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Jonell Magallanes 😁",
    description: "Uptime monitoring command",
    useges: "uptime [url] add | list | status",
    commandCategory: "Monitoring",
    cooldowns: 0,
};

const https = require('https');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'websites.json');
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

let websites = JSON.parse(fs.readFileSync(filePath));

setInterval(() => {
    websites.forEach((host) => {
        ping.sys.probe(host, function(isAlive){
            let msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is down';
            console.log(msg);
        });
    });
}, 60 * 60 * 1000); // Check every hour

module.exports.run = async function({ api, event, args }) {
   if (!args[0]) return api.sendMessage("Please Add your website to want to monitor\nExample:\n?uptime add [your website]", event.threadID, event.messageID);
  if (args[0] === 'add') {
        websites.push(args[1]);
        fs.writeFileSync(filePath, JSON.stringify(websites));
        return api.sendMessage(`Added ${args[1]} to monitor list.`, event.threadID);
    }

    if(args[0] === 'status') {
        websites.forEach(website => {
            https.get(website, (res) => {
                api.sendMessage(`Status of ${website}: ${res.statusCode}`, event.threadID);
            }).on('error', (e) => {
                api.sendMessage(`Got error on ${website}: ${e.message}`, event.threadID);
            });
        });
    }

    if(args[0] === 'list') {
        let websiteList = "==== Website List ====\n";
        websites.map((site, index) => {
            websiteList += `${index + 1}. ${site}\n`;
        });
        api.sendMessage(websiteList, event.threadID);
    }
};