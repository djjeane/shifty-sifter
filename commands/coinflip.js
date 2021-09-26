exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	// ags[x] can pull different words from user message and we can access them by using arg[0,1,2,3] each arg is separated by a space in user message
	// client.getPoints -> get clients points
	// client.updatePoints -> updates clients points
	if (args.len > 0)//check if they entered heads or tails
	{	
	// function that generates a random number, ceiling is specified as the arguement
	function getRandomInt(max) {
		return Math.floor((Math.random() * max)+1);
	  }
theNumResult = getRandomInt(2);
theResult = ''
	// translates theNumResult number to coinflip result
	if (theNumResult == 1) {
		theResult = 'Heads' 
	} else {
		theResult = 'Tails'
	} 
	// determines win or loss of user
	if (theNumResult == 1 && client.message === 'H'){
		msg = (`Congratulations! You guessed correctly! ${theResult}`)
		outcome = 
	} else {
		msg = (`Better luck next time! The result was... ${theResult}!`)
	}
	if (theNumResult == 2 && client.message === 'T'){
		msg = (`Congratulations! You guessed correctly! ${theResult}`)
	} else {
		msg = (`Better luck next time! The result was... ${theResult}!`)
	}
	}

	else //Prompt for heads or tails and await response
	{
		message.channel.send('Please use the command properly.')
	}
	}


    
    //sends message to the channel
    const msg =  message.channel.send();



};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User",
	pointRec: 0
};

exports.help = {
	name: "gamble",
	category: "Vice",
	description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
	usage: "Light your points on fire!"
};
