exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
	const msg =  message.channel.send("Pong?");
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "ping",
	category: "Miscellaneous",
	description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
	usage: "ping"
};
