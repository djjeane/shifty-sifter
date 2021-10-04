const { SlashCommandBuilder } = require('@discordjs/builders');
const Helper = require('../../modules/MongoHelper.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tip')
        .setDescription('Replies with Pong!')
        .addIntegerOption(option => option.setName('amounttotip').setDescription('Enter a number of points to give.'))
        .addUserOption(option => option.setName('user').setDescription('The user')),
    async execute(interaction) {

        await interaction.deferReply();
        let amountToTip = interaction.options.getInteger('amounttotip');
        let toUser = interaction.options.getUser('user');



        var tippingUserP = await Helper.GetPoints(interaction.member.user.id);
        var tippedUserP = await Helper.GetPoints(toUser.id);

        if (toUser.id == interaction.member.user.id) {
            interaction.editReply(`You cant give yourself points. You think your shit dont stink huh? -5 points.`);
            await Helper.UpdatePoints(interaction.member.user.id, -5);
            return;
        }

        if (amountToTip == 0) {
            interaction.editReply(`You cannot tip 0 points`);
            return;
        }

        if (tippingUserP - amountToTip < 0) {
            amountToTip = tippingUserP;
            return;
        }

        await Helper.UpdatePoints(interaction.member.user.id, -1 * amountToTip);

        await Helper.UpdatePoints(toUser.id, amountToTip);
 
        let message = `${interaction.member.user} has given ${toUser} ${amountToTip} points! Say Thanks.
            You now have ${tippingUserP - amountToTip} points!
            ${toUser} you now have ${tippedUserP + amountToTip}  points!`;

        interaction.editReply(message);

        
    },
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['give', 'donate', 'reward'],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "tip",
    category: "Points",
    description: "Gives this guy some amount of your points.",
    usage: "tip @user x",
};