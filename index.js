const botSettings = require('./bot-settings.json');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('message', async message => {

	// This event will run on every single message received, from any channel or DM.
  
	// It's good practice to ignore other bots. This also makes your bot ignore itself
	// and not get into a spam loop (we call that "botception").
	if(message.author.bot) return;

	// Also good practice to ignore any message that does not start with our prefix, 
	// which is set in the configuration file.
	if(message.content.indexOf(botSettings.prefix) !== 0) return;


	// Here we separate our "command" name, and our "arguments" for the command. 
	// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	// command = say
	// args = ["Is", "this", "the", "real", "life?"]
	let args = message.content.slice(botSettings.prefix.length).trim().split(/ +/g);
	let command = args.shift().toLowerCase();

	if(command === "ping") {
		// Calculates ping between sending a message and editing it, giving a nice round-trip latency.
		// The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
		let m = await message.channel.send("Ping?");
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	}

	if(command === "teams") {
		let teams = parseInt(args.shift());
		let players = args.sort(() => { return .5 - Math.random(); } );
		let perTeam = Math.ceil(players.length/teams);
		let string = '';

		if(!teams > 0) {
			message.channel.send("Você deve especificar o número de times antes!");
			return;
		}

		for(let i = 0; i<teams; i++) {
			string += `Time ${i+1}: ${players.splice(0, perTeam).join(', ')}\n`;
		}

		message.channel.send(string);
	}
});

client.login(botSettings.token);