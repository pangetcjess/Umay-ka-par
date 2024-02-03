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
    name: "ampresetyt",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Jonell Magallanes",
    description: "Command to play random edit preset from yt",
    commandCategory: "Media",
    cooldowns: 20,
};

module.exports.run = async function({ api, event, client, __GLOBAL }) {
   
    const searchResults = await youtube.searchVideos('Alightmotion preset dibawah5mb', 20); api.sendMessage("⏱️ | Sending And fetching the video! please wait..", event.threadID, event.messageID);

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
           api.sendMessage({body: `Random Video Of Peter Griffin \nContent:${info.videoDetails.description}\n\nID:${randomVideo.id}.mp4`, attachment: fs.createReadStream(path.join(videoDirectory, `${randomVideo.id}.mp4`))}, event.threadID, event.messageID); 
        });
    } else {
        api.sendMessage('Couldn´t find any suitable video formats.', event.threadID);
    }
};