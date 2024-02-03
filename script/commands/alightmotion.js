/** Hầu hết mấy ông dùng bypass module donate thì chả cần dùng cái này đâu vì tội gì mà không dùng mấy module xịn hơn đúng k =))**/
/** Đổi Credit ? Nếu bạn không có văn hóa như Hà Mạc Trường Giang ¯\_(ツ)_/¯ **/
module.exports.config = {
	name: "alightmotionlink",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Jonell",
	description: "show all am link",
	commandCategory: "link provider",
	cooldowns: 1
};

module.exports.run = ({ event, api }) => api.sendMessage(`AlightMotion And Aftermotion Link Download:
🔗AfterMotion Link:\n\nAftermotion 5.0.6\nhttps://www.mediafire.com/file/449yd0jx7qhkpgq/AMZ_ORI_DARK_15JUNE.apk/file?dkey=c49rctvb4l4&r=475\n🔗AfterMotion Z 5.0.1:\nhttps://www.mediafire.com/file/xzqwpghnjtewt05/AMZ_ORI_V5_DARK_2JUNE.apk/file\n\n🔗After Motion 3.9.1:\nhttps://drive.google.com/file/d/1dtlUE8pU33nZWHwnY5BDLCJwU_7JC8l6/view?usp=drivesdk\n\n🔗AfterMotion CC+:\nhttps://sfile.mobi/CR4ZbQoiKO7\n\n🔗After Motion:4.0.2\nhttps://www.mediafire.com/file/e4yspojl0biq4tc/After_Motion_4.0.2_Mod_ExtraNewFx_and_Shape_%2528SFILE.MOBI%2529.apk/file
🔗Capcut Mods apk\n\nCapcut for armeabi-v7a:\nhttps://www.mediafire.com/file/a4ogew5j0yvy2fu/CAPCUT_PRO_780_V7A.apk/file\nCapcut for arm64-v8a\nhttps://www.mediafire.com/file/870x0mg2f4j6ee5/CAPCUT_PRO_780_V8A.apk/file
Link Provider:Jonell Magallanes\n\nhttps://linkr.bio/jonell.magallanes10`, event.threadID, event.messageID);