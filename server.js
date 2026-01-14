require('dotenv').config();

const tmi = require('tmi.js');

const client = new tmi.Client({
	channels: [ 'Roykiboyki' ],
	identity: {
		username: process.env.TWITCH_BOT_USERNAME,
		password: process.env.TWITCH_OAUTH_TOKEN
	}
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	const isNotBot = tags.username.toLowerCase() !== process.env.TWITCH_BOT_USERNAME.toLowerCase;

	if (isNotBot) {
		client.say(channel, `Message "${message}" was sent by ${tags.username}`)
	}
	
	console.log(`${tags['display-name']}: ${message}`);
});