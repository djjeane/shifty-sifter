let games = require('../index.js').games;
let tempChannels = require('../index.js').tempChannels;

exports.run =  (client, message, args, level) => { 
	const channels = message.guild.channels.filter(c => c.type === 'voice');
	var user = message.author;
	var valid = false;
	
	for (var [channelID, channel] of channels) {
		for (var [memberID, member] of channel.members) {
			if (memberID == user.id) {
				splitChan = channel;
				valid = true ;
			}
		}

	}
	if (valid) 
	{
		var red = false;
		var blue = false;
		var redID;
		var blueID;

		//Check to see if team channels already exist
		console.log(channels)
		for(var [channelID, channel] of channels){
			if (channel.name == "Red Team")
			{
				red = true;
			}
			if (channel.name == "Blue Team")
			{
				blue = true; 
			}
		}
		
		
		//If they don't create them\
		if(!red){
			console.log('Red Created')
			message.guild.createChannel('Red Team', 'voice')
			.then(channel => {
				channel.setParent('433786053397184532');
			});
		}
		if(!blue){
			console.log('Blue Created')
			message.guild.createChannel('Blue Team', 'voice')
			.then(channel => {
				channel
				channel.setParent('433786053397184532');
			});
		}
		var server = client.guilds.get('433786052931747840');
		var chs = server.channels.filter(c => c.type === 'voice');
		console.log(chs);
		// var channelsNewList = message.guild.channels.filter(c => c.type === 'voice');
		//console.log(channelsNewList)

		var channelMems =  [];
		for (var [channelID, channel] of chs) {
			console.log(channel.name)
			if (channel.name === 'Red Team')
			{
				redID = channelID;
			}
			else if (channel.name === 'Blue Team')
			{
				blueID = channelID;
			}
		}

		// }

		//Grab all of the members of the voice channel

		for (const [memberID, member] of splitChan.members) {
			channelMems.push(member);
		}
		if (splitChan.name == "Blue Team" || splitChan.name == "Red Team")
		{
			var opChannel = message.guild.channels.filter(
				ch =>
				ch.name != splitChan.name &&
				(ch.name == "Blue Team" || ch.name == "Red Team")
			);
			console.log(opChannel.name)
			for (const [memberID, member] of opChannel.members) {
				channelMems.push(member);
			}
    	}


		var numMem = channelMems.length;
		var redTurn = true;
		var theChosen;
		//Randomly assign teams
		console.log(`Redid ${redID} ||| Blueid ${blueID}`);
		if(redID != null || blueID != null){
			message.channel.send('Preparing for bloodshed.')
			while(numMem > 0)
			{

				theChosen = Math.floor(Math.random() * Math.floor(numMem));

				if(redTurn){
					console.log(`Moved ${channelMems[theChosen]} to Red Team`)
					channelMems[theChosen].setVoiceChannel(redID);
					redTurn = false;
				}
				else{
					console.log(`Moved ${channelMems[theChosen]} to Blue Team`);
					channelMems[theChosen].setVoiceChannel(blueID);
					redTurn = true;
				}
				channelMems.splice(theChosen, 1);
				numMem = numMem - 1;
			}
		}
	}
	else 
	{
		message.channel.send('You must be in an active voice channel to use this command');
	}
},

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "split",
	category: "Miscellaneous",
	description: "Moves all the turds to the U bend.",
	usage: "split"
};
