exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if(args.length < 2){
        message.reply(`Not enought arguments proveded, please refer to the help file.`);
        return;
    }
    //Grab the needed paramaters from the argu from the message
    // const immutable - let mutable
	let wager = args[0];
    let prediction = args[1].lowercase;
    let winnings = 0;

    //if any of the provided args are not present, stop here
    if(!wager || !prediction){
            return;
    }
    let flip = Round(Math.random(),1)+1 // stores 1 or 2 in flip variable;
    let result = '';
        if (flip === 1){ //converts number to heads or tails stores in result
            result = 'Heads';
        } else {
            result = 'Tails';
        }
        if (arg[1] === 'heads' && result === 'Heads') {//begin win/loss logic
            winnings += args[0] * 2;
            msg = `Congratulations, you won ${winnings.toString}! You have doubled you bet!`;
        } else if (arg[1] === 'heads' && result === 'Tails') {
            msg = `Dang it! You lost ${wager.toString}. Better luck next time.`;
        } else if (arg[1] === 'tails' && result === 'Tails') {
            winnings += args[0] * 2;
            msg = `Congratulations, you won ${winnings.toString}! You have doubled you bet!`;
        } else if (arg[1] === 'tails' && result === 'Heads') {
            msg = `Dang it! You lost ${wager.toString}. Better luck next time.`;
        } else {
            msg = 'error?';
        }//end of win/loss logic
    let gainedPoints = winnings;//for my sanity, keeps format of spin the wheel UpdatePoints


    client.UpdatePoints(message.author.id,gainedPoints);
    message.reply(msg);


   
};
    function coinflip(guess, bet) {


    }
            message.reply(`Your bet could not be placed. Please reference the help file!`);