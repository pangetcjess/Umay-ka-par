const axios = require('axios');
const fs = require('fs');
const request = require('request');
const xml2js = require('xml2js');

module.exports.config = {
	name: "r34",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Jonell Magallanes and Nethanel Debulgado",
	description: "Send rule34 image",
	commandCategory: "nsfw",
	cooldowns: 10
};

module.exports.run = async ({ api, event, args }) => {
    api.sendMessage("Please put the number you want to send image\nExample:\n?r34 10", event.threadID, event.messageID);
    const parser = new xml2js.Parser();
    const imgCount = Math.min(Number(args[0]), 60); // limit to maximum 10 images
    const images = [];

    for(let i=0; i < imgCount; i++) {
        const response = await axios.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index`);
        parser.parseStringPromise(response.data).then((result) => {
            const posts = result.posts.post;
            const randomPost = posts[Math.floor(Math.random() * posts.length)];
            images.push(randomPost.$.file_url);
        }).catch(err => {
            api.sendMessage("API error, please try again later", event.threadID, event.messageID);
            api.setMessageReaction("❌", event.messageID, (err) => {}, true);
        });
    }

    images.forEach((image, index) => {
        const imgPath = __dirname + `/cache/rule34_${index}.jpg`; 
        request(image).pipe(fs.createWriteStream(imgPath)).on("close", () => {
            api.sendMessage({ body: `🍑 | Rule34 Image ${index+1}`,
                attachment: fs.createReadStream(imgPath)},
                event.threadID, () => fs.unlinkSync(imgPath), event.messageID);
        });
    });
};