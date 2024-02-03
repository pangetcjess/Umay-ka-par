const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const request = require("request");
const stream = require("stream");

module.exports.config = {
    name: "wink",
    version: "1.0.0",
    hasPermission: 0,
    credits: "Jonell Magallanes",
    description: "Enhance the resolution of a video inspired wink",
    commandCategory: "Enhancer",
    usages: "Wink",
    cooldowns: 10,
};

module.exports.run = async ({ api, event, args, client, __GLOBAL }) => {
  if (event.type != "message_reply") return api.sendMessage("Please reply to a video Message", event.threadID, event.messageID);
  if (event.messageReply.attachments.length == 0 || event.messageReply.attachments[0].type != 'video') return api.sendMessage("📫 | Please reply the video to want enchanced Quality ", event.threadID, event.messageID); 
api.sendMessage("⏱️ | Your Video Has been Process just Please Wait...", event.threadID, event.messageID);

  const videoUrl = event.messageReply.attachments[0].url;
  const videoWriteStream = fs.createWriteStream(__dirname + '/temp_orig_video.mp4');

  request(videoUrl).pipe(videoWriteStream).on('close', () => {
    ffmpeg(__dirname + '/temp_orig_video.mp4')
      .outputOptions('-vf scale=-1:1080')  // rescale the video to 1080p, maintaining aspect ratio.
      .output(__dirname + '/temp_enhanced_video.mp4')
      .on('end', () => {
        api.sendMessage({ body: `✅ | Sucessfull Enhanced\n\nHere's Your Video Enhanced`, attachment: fs.createReadStream(__dirname + '/temp_enhanced_video.mp4') }, event.threadID);
      })
      .run();
  });
}