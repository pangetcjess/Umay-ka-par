//umaru.js
module.exports.config = {
    name: "custom",
    version: "1",
    hasPermssion: 0,
    credits: "Jonell Magallanes",
    description: "custom.js from botpack",
    commandCategory: "other",
    usages: "nope",
    cooldowns: 0,
};

const axios = require('axios');
const fs = require('fs');
const schedule = require('node-cron');

module.exports.run = async function({ api, event }) {
 api.sendMessage("This is a custom command from botpack convert into command on mirai By Jonell Magallanes", event.threadID);
  const logger = require('./utils/log')
    const yandeva = {
        autoRestart: {
            status: true,
            time: 40, //40 minutes
            note: 'To avoid problems, enable periodic bot restarts'
        },
        accpetPending: {
            status: false,
            time: 30, //30 minutes
            note: 'Approve waiting messages after a certain time'
        }
    }

    function autoRestart(config) {
        if (config.status) {
            setInterval(async () => {
                logger(`Start rebooting the system!`, "[ Auto Restart ]")
                process.exit(1)
            }, config.time * 60 * 1000)
        }
    }

    function accpetPending(config) {
        if (config.status) {
            setInterval(async () => {
                const list = [
                    ...(await api.getThreadList(1, null, ['PENDING'])),
                    ...(await api.getThreadList(1, null, ['OTHER']))
                ];
                if (list[0]) {
                    api.sendMessage('You have been approved for the queue. (This is an automated message)', list[0].threadID);
                }
            }, config.time * 60 * 1000)
        }
    }

    autoRestart(yandeva.autoRestart)
    accpetPending(yandeva.accpetPending)


    schedule.scheduleJob('*/30 * * * *', function(){
        api.getThreadList(25, null, ['INBOX'], (err, list) => {
            if (err) return console.error(err);
            for (let i = 0; i < list.length; i++) {
                api.sendMessage(`Hello Members How are you today?\nKamustahin kayo ulit after 30 minutes`, list[i].threadID);
            }
        });
    });

    schedule.scheduleJob('*/25 * * * *', function(){
        api.getThreadList(25, null, ['INBOX'], (err, list) => {
            if (err) return console.error(err);
            for (let i = 0; i < list.length; i++) {
                api.sendMessage(`› Hello🤗 How are you? (ᴗ˳ᴗ)`, list[i].threadID);
            }
        });
    });
}