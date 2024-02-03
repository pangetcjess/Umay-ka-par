const cheerio = require("cheerio");
const request = require("request");

module.exports.config = {
  name: "aisekai",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Your Name",
  description: "Chat with Aisekai AI.",
  commandCategory: "chat",
  usages: "aisekai",
  cooldowns: 5
};

module.exports.run = ({ api, event, args }) => {
  request("https://www.aisekai.ai/", (error, response, body) => {
    if (error) {
      api.sendMessage("An error occurred while fetching data from Aisekai.", event.threadID);
      return console.error(error);
    }
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(body);
      // Example: get the first paragraph text from the page. Modify as necessary for correct selector.
      const text = $("p").first().text();

      // Replace 'Your response text here' with the text or element content you scraped from the page.
      const reply = text || "Your response text here";
      api.sendMessage(reply, event.threadID);
    }
  });
};