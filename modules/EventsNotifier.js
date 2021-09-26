const Events = require('../models/Event.js');
const Discord = require("discord.js");

    exports.CheckEvents = async function(client)
    {
            
        var interval = setInterval(async function()
        {
            let now = Date.now();
            let openEvents;
            await Events.find({EventClosed: false}).then(function(docs)
            {
                openEvents = docs;
            });

            if(openEvents)
            {
                openEvents.forEach(event => {
                    if(now >= event.EventNotifyTime)
                    {
                        client.fetchUser(event.EventOrganizer).then( function(author){
                            var membersToNotify = event.UsersToNotify;
                            membersToNotify.forEach(userId =>{
                                client.fetchUser(userId).then( function(member){
                                    SendEmbed(event,author,member);
                                    // member.send(`You have ${event.EventName} scheduled for ${event.EventStartTime}!`);
                                });
                            });
                        });
                        CompleteEvent(event);
                    }
                });
            }
            else
            {
                console.info('No open events found.');
            }
        },60 * 1000); // Every minute
    }
    
    async function CompleteEvent(event)
    {
        event.EventClosed = true;
        event.save(function (err)
        {
            if (err) throw err;
            console.info(`Completed Event ${event.EventName}`);
        });
    }
    
    function SendEmbed(Event,author,userToSend)
    {
        const embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle(`${Event.EventName}`)
            //.setURL('https://discord.js.org/')
            .setAuthor(`Organized by: ${author.username}`, author.avatarURL)
            .setDescription(`The event will take place at: \n \t ${Event.EventStartTime}`)
            //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
            // .addFields(
            //     { name: 'Regular field title', value: 'Some value here' },
            //     { name: '\u200B', value: '\u200B' },
            //     { name: 'Inline field title', value: 'Some value here', inline: true },
            //     { name: 'Inline field title', value: 'Some value here', inline: true },
            // )
            // .addField('Inline field title', 'Some value here', true)
            // .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter('Consider yourself reminded.');

            userToSend.send(embed);
    }
