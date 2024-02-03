module.exports.config = {
	name: "sendfile2",
	version: "2.0.0", 
	hasPermssion: 2,
	credits: "Prince Sanel",
	description: "Read your files",
	commandCategory: "Random", 
	usages: "filename", 
	cooldowns: 0,
};
module.exports.run = async function({ api, event, args }) {
	var name = args[0];
	var { threadID, messageID } = event
	var data = fs.readFile(
          `${__dirname}/${args[0]}.js`,
          "utf-8",
          async (err, data) => {
            if (err) return api.sendMessage(`Command ${args[0]} does not exist!.`, threadID, messageID);
    if (!args[0]) return api.sendMessage("Please provide a name of a file", threadID, messageID);
    api.sendMessage(name+".js: \n"+data, threadID, messageID);
	
}