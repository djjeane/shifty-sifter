exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (args.length < 2) {
        message.reply(`Not enought arguments proveded, please refer to the help file.`);
        return;
    }
    //Grab the needed paramaters from the argu from the message
    // const immutable - let mutable
    let wager = args[0];
    let prediction = args[1].toLowerCase();
    let winnings = 0;
    let msg = '';
    //if any of the provided args are not present, stop here
    if (!wager || !prediction) {
        return;
    }


    let flip = getRandomIntCF(1); // stores 1 or 2 in flip variable;
    let result = '';
    if (flip === 1) { //converts number to heads or tails stores in result
        result = 'heads';
    } else {
        result = 'tails';
    }
    try {
        if (prediction === result) {//begin win/loss logic
            winnings += wager * 2;
            msg = `Congratulations, you won ${winnings}! You have doubled you bet!`;
        } else {
            msg = `Dang it! You lost ${wager}. Better luck next time.`
            winnings -= wager;
        }
        message.reply(msg);
        client.UpdatePoints(message.author.id, winnings);
    } catch (error) {
        console.error(error);
    }
    //end of win/loss logic
};
function getRandomIntCF(max) {
    return Math.floor((Math.random() * max)+1);
  }



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "coinflip",
    category: "gamble",
    description: "Who doesn't like to gamble?",
    usage: "wager guess"
};

