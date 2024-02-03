const tiktokScraper = require('tiktok-scraper');

module.exports.config = {
  name: "tikdownloader",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Your Name or Team",
  description: "Download TikTok videos.",
  commandCategory: "Tools",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  // Check if the user provided a TikTok video link
  if (!args[0] || !args[0].includes('tiktok.com')) {
    return api.sendMessage('Please provide a valid TikTok video link.', event.threadID);
  }

  try {
    const videoInfo = await tiktokScraper.getVideoMeta(args[0]);

    if (videoInfo.videoUrl) {
      const attachment = new MessageAttachment(videoInfo.videoUrl, 'tiktok_video.mp4');
      api.sendMessage({ attachment }, event.threadID);
    } else {
      api.sendMessage('Unable to download the TikTok video.', event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('An error occurred while processing the request.', event.threadID);
  }
};

