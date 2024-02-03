module.exports.config = {
	name: "wanted",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Deku",
	description: "wanted",
	commandCategory: "edit-img",
	usages: "[bounty]",
  cooldowns: 0
};

module.exports.run = async function ({ api, event, args, Users }) {
  let { senderID, threadID, messageID } = event;
  const fs = require("fs-extra");
  const axios = require("axios");
  let pathImg = __dirname + `/cache/${event.threadID}_${event.senderID}.png`;
  var bounty1 = Math.floor(Math.random() * 1000000) +1000
  //let bounty1 = bounty[Math.floor(Math.random() * bounty.length)];
  var text = args[0] || bounty1;
  let uid = event.senderID;
  const res1 = await api.getUserInfo(uid)
var name = res1[uid].name
  let Wanted = (
    await axios.get(`https://sim.ainz-project.repl.co/canvas/wanted?uid=${uid}&bounty=${text}&name=${name}`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(Wanted, "utf-8"));
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};