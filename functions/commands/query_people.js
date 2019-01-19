const lib = require('lib')({token: process.env.STDLIB_TOKEN});
/**
* /query_people
*
*   Basic "Hello World" command.
*   All Commands use this template, simply create additional files with
*   different names to add commands.
*
*   See https://api.slack.com/slash-commands for more details.
*
* @param {string} user The user id of the user that invoked this command (name is usable as well)
* @param {string} channel The channel id the command was executed in (name is usable as well)
* @param {string} text The text contents of the command
* @param {object} command The full Slack command object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/
module.exports = (user, channel, text = '', command = {}, botToken = null, callback) => {
  let t;
  let bet_id = parseInt(text);
  let bet_info;
  lib.utils.storage.get('bet_info' + String(bet_id),(err,val) => {
    bet_info = val;
  });
  for (let i in bet_info.options){
    let option = bet_info.options[i];
    t+=(option+"**");
    for (let j in option.people){
      t+=(option.people[j]+"**");
    }
    t+="  ";
  }
  callback(null, {
    text: `These are the options and the people who voted for them ${t}`,
    attachments: [
      // You can customize your messages with attachments.
      // See https://api.slack.com/docs/message-attachments for more info.
    ]
  });
};
