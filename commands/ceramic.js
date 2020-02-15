exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    let role = message.guild.roles.find(r => r.name === "Ceramic");
    message.member.addRole(role).catch(console.error);

    const embed = {
        "title": "Ceramic Cannot Be Bought",
        "description": "Let it be known that this man is Ceramic and that he only lives for power. This will continue for a 1 week period.",
        "color": 5927940,
        "timestamp": `${Date.now()}`,
        "footer": {
            "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
            "text": "Sifty thanks you for your generous donation to the cause."
        },
        "image": {
            "url": "https://www.azquotes.com/picture-quotes/quote-only-fools-seek-power-and-the-greatest-fools-seek-it-through-force-laozi-55-15-91.jpg"
        },
        "author": {
            "name": "Laozi",
            "icon_url": "https://tribwgnam.files.wordpress.com/2019/08/baphometfrontbust.jpg?quality=85&strip=all&w=770"
        },
        "fields": []
    };
    message.channel.send("Ceramic Generation Code has begun.", {
        embed
    });
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['iseekpower',''],
    permLevel: "User",
    pointRec: 1000
};

exports.help = {
    name: "ceramic",
    category: "Miscellaneous",
    description: "You become ceramic.",
    usage: "ceramic"
};
