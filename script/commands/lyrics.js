const axios = require("axios");

module.exports.config = {
  name: "lyrics",
  version: "2",
  hasPermssion: 0,
  credits: "Prince Sanel",
  description: "Lyrics Finder",
  commandCategory: "Random",
  usages: `${this.config.name} <songname>`,
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
          let { threadID, messageID } = event;
          const prompt = args.join(" ");

          if (!prompt) {
            api.sendMessage(`Please provide a song.\nFormat: ${global.config.PREFIX}lyrics {songname}`, threadID, messageID);
            return;
          }

          try {
            api.sendMessage(`Searching: ${prompt} , Please wait...`, threadID, messageID);
            const res = await axios.get(`https://lyapi.rapos93130.repl.co/api/song=${prompt}`);
            const data = res.data;

            if (data.lyrics && data.artist && data.owner) {
              const response = `Lyrics: ${data.lyrics}\n Artist: ${data.artist}\n`;
              api.sendMessage(response, threadID, messageID);
            } else {
              api.sendMessage("No lyrics found..", threadID, messageID);
            }
          } catch (error) {
            console.error(error);
            api.sendMessage("Error occurred while fetching data from the Lyrics API.", threadID, messageID);
  }
};