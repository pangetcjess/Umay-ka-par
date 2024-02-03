const axios = require('axios');
const fs = require('fs');
const https = require('https');

module.exports.config = {
  name: "research",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Your name",
  description: "Research Command",
  commandCategory: "User",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  args = typeof args === "string" ? args : args.join(" "); 
  try {
    let [title, page] = args.split(" "); 
    page = parseInt(page);

    let response = await axios.get(`https://www.researchgate.net/search.Search.html?query=${title}&type=researcher&page=${page}`);

    if(response.data.status === "success") {
      const file = fs.createWriteStream("research.pdf");
      const request = https.get(response.data.pdfUrl, function(response) {
        response.pipe(file);
      });

      await api.sendMessage({attachment: file, body: `Here is the PDF for your research: ${title}`}, event.threadID);
    } else {
      await api.sendMessage("There's a problem fetching the data. Please try again later.", event.threadID);
    }

  } catch (error) {
    console.error('Error executing research command: ', error);
  }
}