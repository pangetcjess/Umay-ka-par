const axios = require('axios');
const fs = require('fs');
const request = require('request');
const url = 'https://api.comicvine.com/comics/?api_key=597e059c10a75c9b146e76c6337590400aa5a558';

module.exports.config = {
	name: "manga",
	version: "1.0.0",
	hasPermission: 0,
	credits: "Prince Sanel",
	description: "Get Manga stories",
	commandCategory: "No Prefix",
	cooldowns: 0,
};

module.exports.run = function({ api, event, client, __GLOBAL }) {
    axios.get(url)
    .then(function (response) {
        // Assuming response.data.results[0].image.original_url holds the manga URL
        const mangaURL = response.data.results[0].image.original_url;

        var callback = () => api.sendMessage({
            body: "Here is the requested Manga comic story:",
            attachment: fs.createReadStream(__dirname + "/cache/manga.jpg")
        }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/manga.jpg"));

        return request(encodeURI(mangaURL)).pipe(fs.createWriteStream(__dirname + "/cache/manga.jpg")).on("close", () => callback());
    })
    .catch(function (error) {
        console.log(error);
    });
};