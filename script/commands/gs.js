const fetch = require('node-fetch');

module.exports.config = {
  name: "gschoolar",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Your name",
  description: "Search for academic papers on Google Scholar",
  commandCategory: "Utils",
  cooldowns: 5,
  dependencies: {
    "node-fetch": ""
  },
  envConfig: {
    scholarApiKey: "b2c5b4432c0a92a2084c551808540bb1998fd9e224a3629bc3c5943d0c0bf1c0"
  }
};

module.exports.run = async function({ api, event, args, client, __GLOBAL }) {
  let query = args.join(" ") || "biology"; // Default search term is 'biology'
  const apiKey = client.scholarApiKey;
  const searchUrl = `https://serpapi.com/search.json?engine=google_scholar&q=${encodeURIComponent(query)}&api_key=b2c5b4432c0a92a2084c551808540bb1998fd9e224a3629bc3c5943d0c0bf1c0`;
  
  try {
    let response = await fetch(searchUrl);
    let data = await response.json();
    
    if (data.scholar_results && data.scholar_results.length > 0) {
      let resultText = 'Google Scholar Results:\n';
      data.scholar_results.forEach((result, index) => {
        resultText += `${index + 1}. Title: ${result.title}\nLink: ${result.link}\n\n`;
      });
      api.sendMessage(resultText, event.threadID);
    } else {
      api.sendMessage("No results found for your query.", event.threadID);
    }

  } catch (error) {
    api.sendMessage(`An error occurred while performing the search: ${error.message}`, event.threadID);
  }
};