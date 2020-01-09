import games from '../index';
import tempChannels from '../index';

exports.run = (client, message, args, level) => { 
	const channels = message.guild.channels.filter(c => c.type === 'voice');
		var user = message.author;
		var valid = false;
        for (const [channelID, channel] of channels) {
            for (const [memberID, member] of channel.members) {
                if (memberID == user.id) {
                	splitChan = channel;
                    valid = true ;
                }
            }

        }
		if (valid) 
		{
            message.channel.send('Preparing for bloodshed.');
            const channels = message.guild.channels.filter(c => c.type === 'voice');
			var red = false;
			var blue = true;
			//Check to see if team channels already exist
			for(const [channelID, channel] of channels){
				if(channel.name == "Red Team"){
					red = true;
				}
				else if (channel.name == "Blue Team"){
					blue = true;
				}
			}
			//If they don't create them\
			var redID;
			if(!red){
				message.guild.createChannel("Red Team", 'voice')
				.then(async channel => {
					tempChannels.push({
						newID: channel.id,
						guild: channel.guild
					})
					redID = channel.id;
				});
			}
			var blueID;
			if(!blue){
				message.guild.createChannel("Blue Team", 'voice')
				.then(async channel => {
					tempChannels.push({
						newID: channel.id,
						guild: channel.guild
					})
					blueID = channel.id;
				});
			}
			var channelMems [];
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
				theChosen = exports.random(numMem);
				if(redTurn){
					channelMems[theChosen].setVoiceChannel(redID);
				}
				else{
					channelMems[theChosen].setVoiceChannel(blueID);
				}
				channelMems.splice(theChosen, 1);
				numMem = numMem - 1;
			}
		}
		else {
			message.channel.send('You must be in an active voice channel to use this command');
	}
},
    
    //Thanks: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
exports.random = (max) => { 
	console.log("hit")
	return Math.floor(Math.random() * Math.floor(max));
}
