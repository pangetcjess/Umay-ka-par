const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "randomcc",
  version: "1.0.0",
  hasPermssion: "0",
  credits: "Kim Joseph DG Bien",
  description: "Random CapCut Template Video",
  commandCategory: "video",
  usage: "rndcc",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
  try {
    api.sendMessage("Getting random template...", event.threadID);

    const response = await axios.get('https://random-capcut-template-video.hiroshiapi.repl.co/');
    const videoData = response.data;

    const filePath = path.join(__dirname, `/cache/cc.mp4`);
    const writer = fs.createWriteStream(filePath);

    const videoResponse = await axios({
      method: 'get',
      url: videoData.hiroMP4,
      responseType: 'stream'
    });

    videoResponse.data.pipe(writer);

    writer.on('finish', () => {
      api.sendMessage(
        {
          body: `𝐑𝐚𝐧𝐝𝐨𝐦 𝐂𝐚𝐩𝐂𝐮𝐭 𝐓𝐞𝐦𝐩𝐥𝐚𝐭𝐞:\n\n𝐓𝐢𝐭𝐥𝐞: ${videoData.Title}\n𝐏𝐨𝐬𝐭 𝐛𝐲: ${videoData.Name}\n𝐋𝐢𝐧𝐤: ${videoData.tempLINK}`,
          attachment: fs.createReadStream(filePath),
        },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });

  } catch (error) {
    console.error('Error:', error);
    api.sendMessage("An error occurred while processing the request.", event.threadID);
  }
};
