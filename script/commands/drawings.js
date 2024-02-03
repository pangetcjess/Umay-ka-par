const fs = require("fs");
const request = require("request");

module.exports.config = {
	name: "drawings",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Jonell Magallanes",
	description: "Sends a random drawing image",
	commandCategory: "No Prefix",
	cooldowns: 0,
};

module.exports.run = async ({ api, event }) => {
  
    const url = "https://source.unsplash.com/random/?drawings"; 
    let { threadID, messageID } = event; 
api.sendMessage("⏱️ | Sending Please wait....", threadID, messageID);
  
    request({
      url: url,
      encoding: "binary"
    }, (err, response, body) => {
      if (err) return console.log(err);
      fs.writeFileSync(__dirname + "/cache/random_drawing.jpg", body, "binary");
      api.sendMessage({body: `Here's your Random Drawing Image 🖼️`, attachment: fs.createReadStream(__dirname + "/cache/random_drawing.jpg")}, threadID, () => {
        fs.unlinkSync(__dirname + "/cache/random_drawing.jpg");
      });
    });
}