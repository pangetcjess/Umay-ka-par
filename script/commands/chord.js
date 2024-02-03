const tabs = require("ultimate-guitar");

module.exports.config = {
  name: "chords",
  version: "1.0",
  hasPermission: 0,
  credits: "Joshua Sy & kshitiz",
  description: "Get Chords",
  commandCategory: "media",
  usages: "[chords]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  let songName = args.join(" ");

  if (songName === "") {
    api.sendMessage("Please type 'chords' with the song name", event.threadID, event.messageID); api.setMessageReaction("🔍", event.messageID, () => { }, true);
    return;
  }

  try {
    const res = await tabs.firstData(songName);

    if (!res) {
      console.error(`Chords for '${songName}' not found.`);
      api.sendMessage(`Chords for '${songName}' not found.`, event.threadID, event.messageID); api.setMessageReaction("🔭", event.messageID, () => { }, true);
    } else {
      var title = res.title;
      var chords = res.chords;
      var type = res.type;
      var key = res.key;
      var artist = res.artist;
     api.setMessageReaction("🎸", event.messageID, () => { }, true);
      api.sendMessage(
        `Artist: ${artist}\nTitle: ${title}\nType: ${type}\nKey: ${key}\n——Here’s the chords——\n\n${chords}\n\n——End——`,
        event.threadID,
        event.messageID
      );
    }
  } catch (err) {
    console.error("[ERR] " + err);
    api.sendMessage("[ERR] An error occurred while fetching chords.", event.threadID, event.messageID);
  }
};