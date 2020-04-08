const siteUrl = 'http://127.0.0.1:5500/index.html';
const axios = require('axios');
const cheerio = require('cheerio');
const performBotOperation = require('../bot/performBotOperation');


let followCommand = function() {
  axios.get(siteUrl)
    .then(response => {
      // handle success
      const $ = cheerio.load(response.data);
      return $('#current-command-value').text();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then((command) => {
      performBotOperation(command);
    });
};

const main = function() {
  setInterval(() => followCommand(), 250);
};

main();