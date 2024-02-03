module.exports.config = {
  name: "adminonly",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Your Name",
  description: "Activate or deactivate adminonly state",
  commandCategory: "system",
  usages: "[on/off]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const { readFileSync, writeFileSync } = require("fs-extra");
  const { join } = require("path");
  const pathData = join(__dirname , './AdminOnly.json');
  var Data2a = JSON.parse(readFileSync(pathData, "utf-8"));

  var thisThread = await Data2a.find(item => item.Misc == event.threadID) || { Misc: event.threadID, Status: 1, Onlist: [] };

  if (!Data2a.some(item => item.Misc == event.threadID)) {
    Data2a.push(thisThread);
    writeFileSync(pathData, JSON.stringify(Data2a, null, 4), "utf-8");
  }

  if (args.length === 0 || (args[0] !== 'on' && args[0] !== 'off')) {
    return api.sendMessage("Please specify whether to turn AdminOnly mode on or off.", event.threadID);
  }

  if (args[0] == 'on') {
    thisThread.Status = 2;
    api.sendMessage("AdminOnly mode is activated!", event.threadID);
  } else if (args[0] == 'off') {
    thisThread.Status = 1;
    api.sendMessage("AdminOnly mode is deactivated!", event.threadID);
  }

  writeFileSync(pathData, JSON.stringify(Data2a, null, 4), "utf-8");
};