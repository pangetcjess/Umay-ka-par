const axios = require('axios');
const { FBdownloader } = require('@xaviabot/fb-downloader');

module.exports.config = {
  name: "fbdl",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell Magallanes",
  description: "Download video from Facebook",
  commandCategory: "utility",
  usages: "[Facebook video link]",
  usePrefix: true,
  cooldowns: 30
};

module.exports.run = async ({ api, event, args }) => {
  try {
    if (args.length === 0) {
      api.sendMessage("Please provide a Facebook video link.", event.threadID, event.messageID);
      return;
    }
    
    const videoUrl = args[0];
    const downloader = new FBdownloader();
    const videoData = await downloader.getLinks(videoUrl);
    
    // We assume the user wants the highest quality available, so we find the link with the highest resolution
    const qualityOptions = Object.keys(videoData.download);
    const highestQuality = qualityOptions.sort((a, b) => parseInt(b) - parseInt(a))[0];
    const downloadLink = videoData.download[highestQuality];
    
    // This message could be changed to provide a clickable link or possibly integrate a downloader function
    api.sendMessage(`Download the video from the link: ${downloadLink}`, event.threadID, event.messageID);
    
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while trying to fetch the download link. Please make sure the video URL is correct.", event.threadID, event.messageID);
  }
};