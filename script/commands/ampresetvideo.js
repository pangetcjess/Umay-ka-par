const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyDgttOerCNlP2Qgdzfnx4VLDQgnPLFXhBg');
const fs = require('fs');
const path = require('path');

const videoDirectory = path.join(__dirname, 'videos'); 

if (!fs.existsSync(videoDirectory)){
    fs.mkdirSync(videoDirectory, { recursive: true });
}

module.exports.config = {
    name: "ampreset",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Jonell Magallanes",
    description: "Random Video jedag jedug alight motion preset dibawah 5mb video",
    commandCategory: "Fun",
    cooldowns: 20,
};

module.exports.run = async function({ api, event, client, __GLOBAL }) {

    const searchResults = await youtube.searchVideos('diether preset', 50); api.sendMessage("⏱️ | Sending the video! please wait..", event.threadID, event.messageID);

    if (!searchResults || searchResults.length === 0) {
        return api.sendMessage("🔭 | Couldn't find any videos.", event.threadID);
    }

    const randomVideo = searchResults[Math.floor(Math.random() * searchResults.length)];

    const url = `https://www.youtube.com/watch?v=${randomVideo.id}`;

    const info = await ytdl.getInfo(url);

    var format = ytdl.chooseFormat(info.formats, { filter: 'audioandvideo' });

    if (format) {
        let videoWriteStream = fs.createWriteStream(path.join(videoDirectory, `${randomVideo.id}.mp4`));
        ytdl(url, { quality: 'highestaudio' }).pipe(videoWriteStream);

        videoWriteStream.on('close', () => {
           api.sendMessage({body: `Random Video of jedag jedug alight motion preset dibawah 5mb \n\nVIDEO ID:${randomVideo.id}.mp4`, attachment: fs.createReadStream(path.join(videoDirectory, `${randomVideo.id}.mp4`))}, event.threadID, event.messageID); 
        });
    } else {
        api.sendMessage('Couldn´t find any suitable video formats.', event.threadID);
    }
};