module.exports.config = {
  name: "randommemes",
  version: "1.0.0",
  hasPermssion: "0",
  credits: "Jonell Magallanes",
  description: "Random memes from TikTok",
  commandCategory: "Media",
  usage: "randommemes",
  cooldowns: 10,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.run = async function({ api, event }) {
  try {
    api.sendMessage("⏱️ | Searching and Fetching The video, just please wait...", event.threadID, event.messageID);

    const response = await axios.get(
      `https://tiktokapi-by-jonell-magallanes--hutchin.repl.co/tiktok/searchvideo=oceanbackgroundmemes`,
      { 
        timeout: 5000 // wait for 5 seconds max
      }
    );

    if (response.status != 200) {
      throw new Error("Server responded with non-ok status");
    }

    const videos = response.data.data.videos;
    if (!videos || videos.length === 0) {
       api.sendMessage("No videos found.", event.threadID, event.messageID);
       return;
    }

    const videoData = videos[0];
    const videoUrl = videoData.play;
    const message = `Random Memes From TikTok\n\nPost by: ${videoData.author.nickname}\nUsername: ${videoData.author.unique_id}\n\nContent: ${videoData.title}`;
    const filePath = path.join(__dirname, `/cache/edit.mp4`);

    const videoResponse = await axios(
      {
        method: 'get',
        url: videoUrl,
        responseType: 'stream',
        timeout: 5000
      }
    );

    const writer = fs.createWriteStream(filePath);
    videoResponse.data.pipe(writer);

    writer.on('finish', () => {
      api.sendMessage(
        { body: message, attachment: fs.createReadStream(filePath) },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });

  } catch (error) {
    if (axios.isTimeout(error)) {
      api.sendMessage("📫 | Failed to retrieve, please try again later.", event.threadID);
    } else {
      console.error('Error:', error);
      api.sendMessage("🎯 | An error occurred while processing the request.", event.threadID);
    }
  }
};