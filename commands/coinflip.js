exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
	
	// function that generates a random number, ceiling is specified as the arguement
	function getRandomInt(max) {
		return Math.floor((Math.random() * max)+1);
	  }
theNumResult = getRandomInt(2);
theResult = ''
	if (theNumResult == 1) {
		theResult = 'Heads' 
	} else {
		theResult = 'Tails'
	}
	if (theNumResult == 1){
		msg = (`Congratulations! You guessed correctly! ${theResult}`)
	} else {
		msg = (`Congratulations! You guessed correctly! ${theResult}`)
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
