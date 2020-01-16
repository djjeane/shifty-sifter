exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const msg =  message.channel.send("Pong?");
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User",
	pointRec: 0
};

exports.help = {
	name: "report",
	category: "Moderation",
	description: "It reports the user actions to the moderators.",
	usage: "report @user [reason]"
};
