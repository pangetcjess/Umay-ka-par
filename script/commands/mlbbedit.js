module.exports.config = {
  name: "randomledit",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jonell Magallanes",
  description: "Random edit from TikTok",
  commandCategory: "Media",
  usage: "Randomedit",
  cooldowns: 30,
};

const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.run = async function({ api, event }) {  
  try {
    const ml = ["mlbb editor", "ml edit", "mlbb alightmotion 5mb dibawah", "mlbb edit after effects edit", "mlbb velocity", "mobile legends edit", "mlbb preset alightmotion", "mllb gameplay edit", "mlbb edit highlights", "mllb edit"];

  const jonell = ml[Math.floor(Math.random() * ml.length)];

    api.sendMessage("⏱️ | Searching and Fetching The video, just please wait...", event.threadID, event.messageID);

    const response = await axios.get(
      `https://pogi-kaba.haroldhutchapi.repl.co/tiktok/searchvideo?keywords=${ml}`,
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
    const message = `Random MLBB EDIT from TikTok\n\nPost by: ${videoData.author.nickname}\n\nUsername: ${videoData.author.unique_id}\n\nContent: ${videoData.title}`;
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