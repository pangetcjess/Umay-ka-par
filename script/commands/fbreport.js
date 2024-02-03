module.exports.config = {
  name: "reportv1",
  version: "2.0.0",
  hasPermssion: 2,
  credits: "credits",
  description: "RIP POSER/RP ACCOUNT",
  commandCategory: "report",
  usages: "reportv1 [uid]",
  cooldowns: 2,
};

const cook = "datr= L3hnY90pdJwWsZbe0g2eMefE; fr= 0t46KsSpkiZhk9fzb.AWVOCDud0U20K4q0_BFO_iok7vg.Bkh6Z0.tN.AAA.0.0.Bkh7CA.AWWR8bmDjiM; m_page_voice= 100093251606743; sb= L3hnY0hcf4RwphDv-h38Ehu1; xs= 24%3AyAsSvyR7aDhMQw%3A2%3A1686613606%3A-1%3A-1; c_user=  100092201756111;";

const encodedCook = encodeURIComponent(cook).replace(/%(?![0-9a-fA-F]{2}|3[Bb])/g, '%25');

module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
  let { messageID, threadID, senderID, body } = event;
  const response = args.join(" ");

  if (!args[0]) return api.sendMessage("Prefix: reportv1 [uid]", threadID, messageID);

  try {
    api.sendMessage(`❤️‍🔥LET THEM BURN ❤️‍🔥 ID:\nhttps://www.facebook.com/profile.php?id=${response}\n\nModule by: Shiki Machina`, threadID, messageID);
    const res = await axios.get(`https://apimahiro--mahirochan1.repl.co/api?cookie=${encodedCook}&id=${response}`);
    console.log(res); // Log the entire res object
    const respond = res.data.message;
    api.sendMessage(respond, threadID, messageID);
    api.sendMessage("Report has been successfully sent!", threadID, messageID);
  } catch (error) {
    console.log(error);
    api.sendMessage("An error occurred while fetching the API response.", threadID, messageID);
  }
};