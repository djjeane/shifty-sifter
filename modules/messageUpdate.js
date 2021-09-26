

module.exports = async (client, oldMessage, newMessage) => {
    console.log(newMessage.content)
    const bannedWords = [
        "bitly",
        "goo.gl",
        "tinyurl",
        "ow.ly",
        "is.gd",
        "buff.ly",
        "adf.ly",
        "bit.do",
        "Mcaf.ee",
        "rebrandly",
        "su.pr",
        "polar",
        "tiktok"
    ]
    var start = Date.now()
    bannedWords.forEach(word => {

        if (newMessage.content.toLowerCase().includes(word)) {
            console.log("Found word")
            newMessage.delete()
                .then(newMessage.channel.send('Link Deleted:\n**TikTok is porn for Tweens**'))
            var end = Date.now()
            newMessage.channel.send(end - start + " miliseconds")
            return;
        }

    })


};