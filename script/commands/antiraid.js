module.exports.config = {
 name: "antiraid",
 version: "1.0.0",
 credits: "D-Jukie",
 hasPermssion: 1,
 description: "Prevent changing group administrators",
 usages: "",
 commandCategory: "Box Chat",
 cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
      return api.sendMessage('I need group administrator permissions, please add me as admin and try again!', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["antiraid"] == "undefined" || data["antiraid"] == false) data["antiraid"] = true;
    else data["antiraid"] = false;
    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);
    return api.sendMessage(`${(data["antiraid"] == true) ? "Antiraid ON" : "Antiraid OFF"} Successful Antiraid Group`, event.threadID, event.messageID);
}

module.exports.handleEvent = async ({ api, event }) => {
  if (event.logMessageType === 'log:thread-name') {
    const info = await api.getThreadInfo(event.threadID);
    if (event.author !== api.getCurrentUserID()) {
      api.removeUserFromGroup(event.author, event.threadID);
      api.sendMessage(`${event.author} has been removed for attempting to change the group's name.`, event.threadID);
    }
  }

  if (event.logMessageType === 'log:thread-icon') {
    const info = await api.getThreadInfo(event.threadID);
    if (event.author !== api.getCurrentUserID()) {
      api.removeUserFromGroup(event.author, event.threadID);
      api.sendMessage(`${event.author} has been removed for attempting to change the group's picture.`, event.threadID);
    }
  }

  if (event.logMessageType === 'log:subscribe') {
    const info = await api.getThreadInfo(event.threadID);
    if (event.author !== api.getCurrentUserID()) {
      api.removeUserFromGroup(event.data.addedParticipants[0].id, event.threadID);
      api.sendMessage(`${event.author} has been removed for attempting to add a new participant.`, event.threadID);
    }
  }
};