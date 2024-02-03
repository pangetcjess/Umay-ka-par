
const fs = require("fs");

module.exports.config = {
  name: "read",
  version: "69",
  hasPermission: 0,
  credits: "sensui",
  description: "pinaka useless na command by sensui HAHAHAHA",
  usePrefix: true,
  commandCategory: "fun",
  usages: ".read <your input>",
  cooldowns: 5,
};

module.exports.run = async function({
    api, event, args
}) {
    const axios = require('axios');

  let text = args.join(" ");
  if (!text) {
        return api.sendMessage("❌ How Can I Read Your Mind If Your Missing an input!", event.threadID, event.messageID)
  }
  api.sendMessage("Wait And I Will Read Your Mind", event.threadID, event.messageID);
  api.sendMessage(`Your Thinking Of [ ${text} ]\n\n"A person who thinks all the time has nothing to think about except thoughts."`, event.threadID, event.messageID);
  
}
