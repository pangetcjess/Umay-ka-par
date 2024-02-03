module.exports.config = {
  name: "petergriffin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jonell Magallanes",
  description: "Random Video of Peter Griffin from TikTok",
  commandCategory: "Fun",
  usage: "PeterGriffin",
  cooldowns: 20,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.run = async function({ api, event }) {  
  try {
    const peter = ["Peter Griffin ", "Peter Griffin Memes", "Peter Griffin Happy Happy", "Peter Griffin Scene", "Family Guy", "Peter Griffin Edit", "PeterGriffin shorts", "Family guys scene", "Peter Griffin Funny Scene", "Peter Griffin Brutality memes video"];
  // Randomly select a song from worshipSongs array
  const jonell = peter[Math.floor(Math.random() * peter.length)];

    api.sendMessage("⏱️ | Searching and Fetching The video, just please wait...", event.threadID, event.messageID);

    const response = await axios.get(
      `https://tiktokapi-by-jonell-magallanes--hutchin.repl.co/tiktok/searchvideo?keywords=${peter}`,
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
    const threadID = event.threadID;
    const videoData = videos[0];
    const videoUrl = videoData.play;
    const message = `Random Peter Griffin Videos\n\nID: ${threadID}`;
    const filePath = path.join(__dirname, `/cache/PeterGriffin.mp4`);

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