const axios = require('axios');
const fs = require('fs');

module.exports.config = {
	name: "postccimg",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Your Name Here",
	description: "Post image to PostImg.cc",
	commandCategory: "utilities",
	usages: "prefix + command",
  cooldowns: 0
};

module.exports.run = async function({ api, event }) {
	// check if there's Input Image
	if (!event.messageReply.images)
		return api.sendMessage("You need to reply to an image to upload.", event.threadID);

	// get the attachment url
	const url = event.messageReply.attachment.url; 
	
	// axios will get the image as a stream
	const response = await axios({
		url,
		method: 'GET',
		responseType: 'stream'
	});

	// write stream to a temp file
	const path = `./temp.png`;
	const writer = fs.createWriteStream(path);
	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve);
		writer.on('error', reject);
	}).then(() => {
		// now we upload the file to postimg.cc
		const formData = new FormData();
		formData.append('file', fs.createReadStream(path));
		
		return axios.post('https://postimg.cc/image/', formData, {
			headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
		});
	}).then(response => {
		// send the image URL to the thread
		api.sendMessage("Image uploaded: " + response.data.data.image.url, event.threadID);
	}).catch(error => {
         // handle error
         console.error(error);
     });
}