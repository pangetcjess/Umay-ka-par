const axios = require('axios');
const fs = require('fs');
const path = require('path');
const util = require('util');
const Jimp = require('jimp');
const unlinkAsync = util.promisify(fs.unlink);

module.exports.config = {
    name: "nsfwaifu",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Jonell Magallanes",
    description: "Get a random NSFW waifu image",
    commandCategory: "nsfw",
    usages: "",
    cooldowns: 20,
};

module.exports.run = async ({ api, event }) => {
    try {
        const response = await axios.get('https://api.easy0.repl.co/api/nsfw/waifu');
        const imageUrl = response.data.image;
        const imagePath = path.join(__dirname, 'cache', `${Date.now()}-nsfwaifu.jpg`);

        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const image = await Jimp.read(Buffer.from(imageResponse.data));
        // Modify the image with Jimp, as an example invert the image.
        await image.invert().writeAsync(imagePath);

        api.sendMessage({
            body: `💦 | Here's the random NSFW waifu image:`,
            attachment: fs.createReadStream(imagePath)
        }, event.threadID, event.messageID, async (error, messageInfo) => {
            if (!error) {
                // Delete the image from cache after sending
                await unlinkAsync(imagePath);
            }
        });
    } catch (error) {
        console.error('Error fetching nsfw waifu image:', error);
        api.sendMessage('An error occurred while fetching the NSFW image.', event.threadID, event.messageID);
    }
};