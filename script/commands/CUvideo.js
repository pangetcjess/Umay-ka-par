module.exports.config = {
  name: "cuedit",
  version: "1.0.0",
  hasPermssion: "0",
  credits: "Jonell Magallanes",
  description: "Random Captain Underpants edit from TikTok",
  commandCategory: "Media",
  usage: "cuvideo",
  cooldowns: 10,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.run = async function({ api, event }) {  
  try {
    const cu = ["captain underpants edit", "CU edit", "Harold and george edit", "Mr krupp edit", "epic tales of captain Underpants edit", "SE editor", "harold Hutchins edit", "George beard edit"];
  
  const cu = cu[Math.floor(Math.random() * cu.length)];

    api.sendMessage("⏱️ | Searching The video, just please wait...", event.threadID, event.messageID);

    const response = await axios.get(
      `https://tiktokapi-by-jonell-magallanes--hutchin.repl.co/tiktok/searchvideo?keywords=${cu}`,
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
    const message = `Random Edit of Captain Underpants\n\nPost by: ${videoData.author.nickname}\n\nUsername: ${videoData.author.unique_id}`;
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