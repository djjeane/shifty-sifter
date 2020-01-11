let games = require('../index.js').games;
let tempChannels = require('../index.js').tempChannels;

exports.run = (client, message, args, level) => { 
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
            message.channel.send('Preparing for bloodshed.');
			var red = false;
			var blue = false;
			var redID;
			var blueID;

			//Check to see if team channels already exist
			client.logger.log(channels);
			for(var [channelID, channel] of channels){
				console.log(channel.name)
				if (channel.name == "Red Team") {
					red = true;
				}
				else if (channel.name == "Blue Team") {
					blue = true;
				}
			
			}
			//If they don't create them\
			if(!red){
				console.log('Red Created')
				message.guild.createChannel("Red Team", 'voice')
				.then(channel => {
					tempChannels.push({
						newID: channel.id,
						guild: channel.guild
					})
					channel.setParent('433786053397184532');

				});
			}
			if(!blue){
				console.log('Blue Created')
				message.guild.createChannel("Blue Team", 'voice')
				.then(channel => {
					tempChannels.push({
						newID: channel.id,
						guild: channel.guild
					});
					channel.setParent('433786053397184532');
				});
				

			}

			redId = message.guild.channels.find(c => c.name == "Red Team" && c.type == "voice").id;
			blueId = message.guild.channels.find(c => c.name == "Blue Team" && c.type == "voice").id;

  			console.log(redID)
			console.log(blueID)
			var channelMems =  [];
			//Grab all of the members of the voice channel
			for (const [memberID, member] of splitChan.members){
				channelMems.push(member);
			}
			var numMem = channelMems.length;
			var redTurn = true;
			var theChosen;
			//Randomly assign teams
			while(numMem > 0)
			{
				theChosen = Math.floor(Math.random() * Math.floor(numMem));
				if(redTurn){
					channelMems[theChosen].setVoiceChannel(redID);
					redTurn = false;
				}
				else{
					channelMems[theChosen].setVoiceChannel(blueID);
					redTurn = true;
				}
				channelMems.splice(theChosen, 1);
				numMem = numMem - 1;
			}
		}
		else {
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
