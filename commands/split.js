import games from '../index';
import tempChannels from '../index';

module.exports = {
    name: 'split',
    description: 'Forms teams for battles to the death.',
    var splitChan;
    execute(message, args) {
        if (module.exports.validateCommand(message)) {
            message.channel.send('Preparing for bloodshed.');
            module.exports.splitMembers(message);
        } else {
            message.channel.send('You must be in an active voice channel to use this command');
        }
    },
    validateCommand: function (message) {
        const channels = message.guild.channels.filter(c => c.type === 'voice');
        var user = message.author;
        for (const [channelID, channel] of channels) {
            for (const [memberID, member] of channel.members) {
                if (memberID == user.id) {
                	splitChan = channel;
                    return true;
                }
            }

        }
        return false;
    },
    splitMembers: function (message)
    {
    	const channels = message.guild.channels.filter(c => c.type === 'voice');
    	var red = false;
    	var blue = true;
    	//Check to see if team channels already exist
    	for(const [channelID, channel] of channels){
    		if(channel.name == "Red Team"){
    			red = true;
    		else if (channel.name == "Blue Team"){
    			blue = true;
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
    	while(numMem > 0){
    		theChosen = module.exports.random(numMem);
    		if(redTurn){
    			channelMems[theChosen].setVoiceChannel(redID);
    		}
    		else{
    			channelMems[theChosen].setVoiceChannel(blueID);
    		}
    		channelMems.splice(theChosen, 1);
    		numMem = numMem - 1;
    	}
    },
    //Thanks: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    random: function (max)
    {
    	return Math.floor(Math.random() * Math.floor(max));
    }
}