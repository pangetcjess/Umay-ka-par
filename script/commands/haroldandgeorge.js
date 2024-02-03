const axios = require("axios");
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports.config = {
  name: "aiharold",
  version: "1.0.0",
  hasPermission: 0, 
  credits: "JV Barcenas & cyril",
  description: "ChatGPT-4",
  prefix: false,
  commandCategory: "ChatBots",
  cooldowns: 20,
};

module.exports.run = () => {
  readline.question("Please enter your question: ", async (prompt) => {
    try {
      prompt = prompt.trim();

      if (!prompt) {
        console.log("Please provide a question to answer\n\nExample:\nai what is solar system?");
        return;
      }

      if (prompt) {
        console.log("🔍 | Searching and Typing Your Answer! Please Wait....");

        const response = await axios.get(`https://chatgayfeyti.archashura.repl.co?gpt=${encodeURIComponent(prompt)}`);

        if (response.status === 200 && response.data && response.data.content) {
          const messageText = response.data.content.trim();
          console.log('Answer: ' + messageText);
        } else {
          throw new Error('Invalid or missing response from API');
        }
      }
    } catch (error) {
      console.error(`Failed to get an answer: ${error.message}`);
      console.log(`${error.message}.\nAn error occurred fetching GPT API, please try again later.`);
    }

    readline.close();
  });
}

// Run the module
module.exports.run();