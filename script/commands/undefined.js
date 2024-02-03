module.exports.config = {
  name: "picsum",
  version: "1.0.0",
  credits: "Sensui",
  description: "Generate random Picture",
  hasPermssion: 0,
  commandCategory: "fun",
  usage: "[picsum]",
  cooldowns: 5,
  dependencies: [],
  usePrefix: true
};

module.exports.run = async function({ api, event }) {
  const axios = require("axios");
  const request = require('request');
  const fs = require("fs")
  let data = await axios.get('https://sensui-useless-apis.codersensui.repl.co/api/tools/lorem-picsum');
  var file = fs.createWriteStream(__dirname + "/cache/picsum.jpg");
  var rqs = request(encodeURI(data.data.imageUrl));
  console.log('Picture Downloaded >>> ' + data.data.imageUrl)
  rqs.pipe(file);
  file.on('finish', () => {
    return api.sendMessage({
      attachment: fs.createReadStream(__dirname + '/cache/picsum.jpg')
    }, event.threadID, event.messageID)
  })
};