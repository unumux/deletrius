var util = require('../util');

function yell(message) {
  const vowels = ["A", "E", "I", "O", "U"];
  let newMessage = "";
  let rand;
  
  message = message.toUpperCase();

  for(let i = 0; i < message.length; i++) {
    let letter = message[i];
    newMessage += letter;
    
    if(vowels.indexOf(letter) !== -1) {
      rand = 0;
      while(rand < 0.5) {
        newMessage += letter;
        rand = Math.random();
      }
    }
  }
  
  rand = 0;
  while(rand < 0.5) {
    newMessage += "!";
    rand = Math.random();
  }

  return newMessage;
}

module.exports = function (param) {
	var	channel		= param.channel,
		response;

    response = yell(param.args.join(' '));

	util.postMessage(channel, response);
};
