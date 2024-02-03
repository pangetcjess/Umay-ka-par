const axios = require('axios');
const { writeFile } = require('fs').promises;
const { createReadStream } = require('fs');

module.exports.config = {
  name: "earthquakev2",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Samir Œ",
  description: "Show a map with the latest earthquake locations",
  commandCategory: "information",
  usages: "earthquakev2 [searchQuery]",
  cooldowns: 10,
};

module.exports.run = async ({ api, event, args }) => {
  const searchQuery = args.join(' ') || "all_hour";
  const earthquakeDataURL = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${searchQuery}.geojson`;

  try {
    const response = await axios.get(earthquakeDataURL);
    const features = response.data.features;
    const locations = features.map(feature => feature.geometry.coordinates.slice(0, 2).reverse()).slice(0, 5); // limiting to 5 locations for simplicity
    const markers = locations.map((loc, idx) => `markers=color:red%7Clabel:${idx+1}%7C${loc.join(',')}`).join('&');
    const mapZoomLevel = 2;
    const mapSize = "512x512";
    const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${mapSize}&zoom=${mapZoomLevel}&${markers}&key=YOUR_GOOGLE_MAPS_STATIC_API_KEY`;

    const imageBuffer = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageName = `earthquake_map_${Date.now()}.png`;
    await writeFile(imageName, imageBuffer.data);

    api.sendMessage({
      body: "Here is the latest earthquakes map:",
      attachment: createReadStream(imageName)
    }, event.threadID, event.messageID);

  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while processing your request. Please try again later.", event.threadID, event.messageID);
  }
};