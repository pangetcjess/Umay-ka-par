  module.exports.config = {
    name: "tikvideo",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Download videos from tiktok without log",
    commandCategory: "NhÃ³m",
    usages: "[link]",
    cooldowns: 5
};
module.exports. run = async function({ api, event, args, Currencies, utils }) {
    const { threadID, messageID } = event;
    const { resolve } = require('path')
    const { createReadStream, unlinkSync } = require("fs-extra");

    const link = args.join(' ');
    if(!link) return api.sendMessage('Please enter the download link!', threadID, messageID);

    const path = resolve(__dirname, 'cache', `tikvideo.mp4`);
    const data = await global.utils.getTiktok(link);
    if(data.status == undefined) return api.sendMessage('Unable to download from this link, please try again with another link', threadID, messageID);
    await global.utils.downloadFile(data.item.video.playAddr[0], path);
    return api.sendMessage({ 
        body: `Author: ${data.item.author.nickname}\Describe: ${data.item.desc}\Soundtrack: ${data.item.music.title}`,
        attachment: createReadStream(path)}, 
    threadID, () => unlinkSync(path), messageID);
                                    }