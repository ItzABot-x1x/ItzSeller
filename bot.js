const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '&';

// Un objeto para almacenar los balances de los usuarios

const balances = {};

client.on('ready', () => {

  console.log(`Logged in as ${client.user.tag}!`);

});

client.on('message', message => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);

  const command = args.shift().toLowerCase();

  // Comando para ver el balance

  if (command === 'balance-dhc') {

    const user = message.mentions.users.first() || message.author;

    if (!balances[user.id]) {

      balances[user.id] = 0;

    }

    message.channel.send(`El balance de ${user} es de ${balances[user.id]} DHC.`);

  }

  // Comando para añadir dinero al balance

  if (command === 'add-dhc') {

    if (!message.member.hasPermission('ADMINISTRATOR')) {

      return message.channel.send('Lo siento, solo los administradores pueden ejecutar este comando.');

    }

    const user = message.mentions.users.first();

    const amount = parseInt(args[0]);

    if (!user || isNaN(amount)) {

      return message.channel.send('Uso correcto: &add-dhc @usuario cantidad');

    }

    if (!balances[user.id]) {

      balances[user.id] = 0;

    }

    balances[user.id] += amount;

    message.channel.send(`Se han añadido ${amount} DHC al balance de ${user}.`);

  }

  // Comando para reiniciar el balance

  if (command === 'reset-dhc') {

    const user = message.mentions.users.first();

    if (!user) {

      return message.channel.send('Uso correcto: &reset-dhc @usuario');

    }

    balances[user.id] = 0;

    message.channel.send(`El balance de ${user} se ha reiniciado a 0 DHC.`);

  }

});

client.login('OTQ4NjI2NTQwMzQ4OTc3MjUz.Gd2RLM.YH1nFxZ5jN3RLMXdeAiiGtbrufvT-Z9pG88Cxs');












