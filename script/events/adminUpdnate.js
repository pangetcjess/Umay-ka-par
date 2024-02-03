module.exports.config = {
  name: "GroupUpdate",
  eventType: ["log:thread-name", "log:thread-color", "log:thread-icon", "log:admin", "log:thread-emoji", "log:nickname"],
  version: "1.0.0",
  credits: "Mirai-Team",
  description: "Notification when there are changes in the group."
};

module.exports.run = async function({ api, event, Users }) {
  
  let msg = "";
  const { threadID, logMessageBody, logMessageData, author } = event;
  
  switch (event.logMessageType) {
    case "log:thread-name":
      msg = `${logMessageData.name} has changed the group name to "${logMessageBody}"`;
      break;
    case "log:thread-color":
      msg = `${logMessageData.name} has changed the group color`;
      break;
    case "log:thread-icon":
      msg = `${logMessageData.name} has changed the group icon`;
      break;
    case "log:admin":
      msg = (logMessageBody.indexOf("added") !== -1) 
        ? `${logMessageData.name} has added ${logMessageBody.replace("added ", "")} as a new admin of the group` 
        : `${logMessageData.name} has removed ${logMessageBody.replace("removed ", "")} from the admin of the group`;
      break;
    case "log:thread-emoji":
      msg = `${logMessageData.name} has changed the group emoji to ${logMessageBody}`;
      break;
    case "log:nickname":
      msg = `${logMessageData.name} changed nickname ${logMessageBody}`;
      break;
    default:
      break;
  }

  if (msg !== "") api.sendMessage(msg, threadID);

  return;
};