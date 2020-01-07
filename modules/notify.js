module.exports.notifyJacob = embed => {
    client.users.get('190179187863060480').send({ embed });
};

module.exports.notifyAdmins = member => {
    const admins = [
        client.users.get('190179187863060480'),
        client.users.get('193129857926955008')
    ];

    //Loops through the admins and sends the embeds
    admins.forEach(admin => {
        admin.send(
            new RichEmbed({
                title: `New User Joined the Server`,
                description: `Name: ${member.user.username}\nPlease assign them the appropriate role!`,
                color: 0x00ff27
            })
        );
    });
};
