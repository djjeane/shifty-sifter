module.exports = {
    name: 'pong',
    description: 'Pong!',
    execute(message, args) {
        message.author.send('No Bitch.');
        message.channel.send('I have answered the call.');
    },
};