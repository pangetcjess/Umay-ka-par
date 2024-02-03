const axios = require('axios');
const fs = require('fs');
const request = require("request");

module.exports.config = {
  name: "palm",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Jonell Magallanes",
  description: "asking questions with palm",
  commandCategory: "ai",
  usages: "palm [your question]",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const question = args.join(" ");
  const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
      request(url).pipe(fs.createWriteStream(path)).on('close', callback);
    });
  }

  if (!question) {
    return api.sendMessage("Please Enter your Question", event.threadID, event.messageID);
  } else {
    try {
      const response = await axios.get(`https://google.odernder.repl.co/palm?text=hi${encodeURIComponent(question)}`);
      const answer = response.data.output;
      const imgURL = 'IMAGE_URL_FROM_PALM_AI'; // replace it with the actual Image URL you get from Palm AI.
      const path = './image.png'
      download(imgURL, path, () => {
        return api.sendMessage({ body: answer, attachment: fs.createReadStream(path) }, event.threadID, event.messageID);
      });
    } catch (error) {
      console.log(error);
      return api.sendMessage("Error fetching api", event.threadID);
    }
  }
};