module.exports.config = {
	name: "4kquality",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Your Name",
	description: "Enhances the photo",
	commandCategory: "Image",
	cooldowns: 5,
};

const axios = require('axios');
const fs = require('fs');
const sharp = require('sharp');

module.exports.run = async ({ api, event }) => {
    if (event.messageReply.attachments.length > 0) {
        const url = event.messageReply.attachments[0].url;
        const response = await axios({
            url,
            responseType: 'arraybuffer'
        });
        const photoPath = './uploads/photo' + Date.now() + '.jpg';
        fs.writeFileSync(photoPath, response.data, 'binary', err => { if (err) throw err; });

        const outputPath = `./enhanced/${path.basename(photoPath)}`;
        
        sharp(photoPath)
            .resize(3840, 2160, { 
                fit: 'inside',
                withoutEnlargement: true
            })
            .toFile(outputPath)
            .then(() => {
                api.sendMessage({attachment: fs.createReadStream(outputPath)}, event.threadID);
            })
            .catch((error) => {
                console.error('Failed to enhance the photo', error);
            });
    } else {
        api.sendMessage("Please reply to a photo to enhance it.", event.threadID);
    }
};