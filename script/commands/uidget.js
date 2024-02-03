module.exports.config = {
	name: "uidget",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Modified By Jonell",
	description: "Get Uid via Facebook link",
	commandCategory: "Utility",
  usePrefix: true,
	cooldowns: 7
   };
   
   module.exports.run = async function({ api, event, args }) {
	   const axios = global.nodemodule['axios']; 
	   if(event.type == "message_reply") { 
	uid = event.messageReply.senderID
	return api.sendMessage(`${uid}`, event.threadID, event.messageID) }
	   if (!args[0]) {return api.sendMessage(`${event.senderID}`, event.threadID, event.messageID);}
	   else {
	if (args[0].indexOf(".com/")!==-1) {
	   const res_ID = await axios.get(`https://fb-api.kimjosephdgbien.repl.co/fbuid?link=${args[0]}`);  
	   return api.sendMessage(`Here's your uid you link  provided\n\n${res_ID.data.uid}`, event.threadID, event.messageID) }
	else {
	 for (var i = 0; i < Object.keys(event.mentions).length; i++) api.sendMessage(`${Object.values(event.mentions)[i].replace('@', '')}: ${Object.keys(event.mentions)[i]}`, event.threadID);
	 return;
	}
   }
   }
  