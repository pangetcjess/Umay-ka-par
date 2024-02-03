module.exports.config = {
  name: "worshipmusic",
  version: "2.0.4",
  hasPermssion: 0,
  credits: "Grey",
  description: "Play a worship song",
  commandCategory: "music",
  usages: "Use without any additional parameters",
  prefix: true,
  cooldowns: 20,
  dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": "",
    "ytdl-core": "",
    "yt-search": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const ytdl = require("ytdl-core");
  const request = require("request");
  const yts = require("yt-search");

  // array of worship songs
  const worshipSongs = ["worship song serve to God", "worship song 10,000 reason", "worship song lyrics", "worship song 3mins duration", "worship song children choir"];
  // Randomly select a song from worshipSongs array
  const song = worshipSongs[Math.floor(Math.random() * worshipSongs.length)];

  try {
    api.sendMessage(`⏱️ | Finding the Worship song. Please wait...`, event.threadID);

    const searchResults = await yts(song);
    if (!searchResults.videos.length) {
      return api.sendMessage("Error: Invalid request.", event.threadID, event.messageID);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    const stream = ytdl(videoUrl, { filter: "audioonly" });

    const fileName = `${event.senderID}.mp3`;
    const filePath = __dirname + `/cache/${fileName}`;

    stream.pipe(fs.createWriteStream(filePath));

    stream.on('response', () => {
      console.info('[DOWNLOADER]', 'Starting download now!');
    });

    stream.on('info', (info) => {
      console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
    });

    stream.on('end', () => {
      console.info('[DOWNLOADER] Downloaded');

      if (fs.statSync(filePath).size > 26214400) {
        fs.unlinkSync(filePath);
        return api.sendMessage('[ERR] The file could not be sent because it is larger than 25MB.', event.threadID);
      }

      const message = {
        body: `Here's your random Worship Song, Enjoy!😇\n\nTitle: ${video.title}\nArtist: ${video.author.name}`,
        attachment: fs.createReadStream(filePath)
      };

      api.sendMessage(message, event.threadID, () => {
        fs.unlinkSync(filePath);
      });
    });
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
};