const fs = require('fs');
const axios = require('axios');
const request = require('request');
const prohibitedWebsites = [
  'pornhub.com',
  'xvideos.com',
  'hentai.com',
  'xnvideos.com',
  'pinayflex.com',
  'rule34.xxx',
  'dagay.com',
];

module.exports.config = {
  name: "prohibit",
  hasPermssion: 0",
  credits: "Jonell Magallanes",
  description: "Prohibit certain websites",
  commandCategory: "Custom",
  usages: "prohibit [url]",
  cooldowns: 5,
};
  module.exports.handleEvent = function({ api, event, }) {
    let threadID = event.threadID;
    let messageID = event.messageID;
    let text = event.body;
    let regex = new RegExp(`https?:\/\/(?:www\.)?(?:${prohibitedWebsites.join('|')})`, 'i');

    if(regex.test(text)) {
      var link = 'https://i.imgur.com/op39ucB.jpeg';
      var callback = () => api.sendMessage({ body: `Prohibited Website has been Detected! This link "${text}" has contains 18+ contents not for minors. please don't enter this website i warn you!`, attachment: fs.createReadStream(__dirname + "/cache/alert.jpg")}, threadID, () => fs.unlinkSync(__dirname + "/cache/alert.jpg", messageID));
      return request(link).pipe(fs.createWriteStream(__dirname + "/cache/alert.jpg")).on("close", callback);
    }
  }


module.exports.run = ({ api, event }) {
  let threadID = event.threadID;
  let messageID = event.messageID;
  let text = event.body;
  let regex = new RegExp(`https?:\/\/(?:www\.)?(?:${prohibitedWebsites.join('|')})`, 'i');


  if(regex.test(text)) {
    let imageUrl = 'https://i.postimg.cc/7LytZnDk/Screenshot-2023-11-01-23-32-56-32.jpg';
    let responseText = 'Pastebin Alert!';
    try {
      let response = await axios.get(text);

      if(response.status == 200){
        var link = imageUrl;
        var callback = () => api.sendMessage({ body: responseText, attachment: fs.createReadStream(__dirname + "/cache/alert.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/alert.jpg", event.messageID + global.harold.adminbot));
        return request(link).pipe(fs.createWriteStream(__dirname + "/cache/alert.jpg")).on("close", () => callback());
      }else{
        return api.sendMessage('Invalid Pastebin URL', threadID, messageID);
      }
    }catch(err){
      return api.sendMessage('Something went wrong', threadID, messageID);
    }
  }
};