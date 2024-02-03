const fetch = require("node-fetch");

module.exports.config = {
  name: "showbiz",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Your Name",
  description: "Get the latest news on showbiz or chika",
  commandCategory: "Your Category",
  cooldowns: 0,
};

module.exports.run = async function({ api, event }) {
  // Fetch the latest showbiz news
  const response = await fetch("https://newsapi.org/v2/everything?q=trend&from=2023-10-04&sortBy=publishedAt&apiKey=dd731c0136cc42539024a967315f0329");
  const data = await response.json();

  // Get the list of news articles
  const articles = data.articles;

  const headline = articles[0].title;

  const desc = article[0]. description;

  const pub = article[0].publishedAt;

  const content = article[0].content;

  const img = article[0].urlToImage;

  const url = article[0].url;
  api.sendMessage(`Title:${headlines}\n\nDescription:${desc}\n\nPublishedAt:${pub}\n\nContent:${content}\n\n=====SOURCE======\nImages:${img}\nSource Url:${url}`, event.threadID);
};