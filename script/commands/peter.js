const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports.config = {
    name: 'peter',
    version: '1.0',
    hasPermission: 0,
    credits: 'Your Name',
    description: 'Get and Save Peter Griffin video',
    commandCategory: 'media',
    usages: 'peter',
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                maxResults: 1,
                q: 'Peter Griffin',
                type: 'video',
                key: 'AIzaSyDgttOerCNlP2Qgdzfnx4VLDQgnPLFXhBg',
            },
        });

        const videoId = response.data.items[0].id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        ytdl(videoUrl)
            .pipe(fs.createWriteStream(`./${videoId}.mp4`));

        api.sendMessage({attachment: fs.createReadStream(`./${videoId}.mp4`)}, event.threadID, event.messageID);

    } catch (error) {
        console.error(error);
        api.sendMessage("[ERR] An error occurred while processing your command.", event.threadID, event.messageID);
    }
};  