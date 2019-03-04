const cheerio = require('cheerio');
const request = require('request-promise');

request({
        method: 'GET',
        url: 'https://www.goal.com/en-gb/live-scores'
},(err, body) =>{
    if (err) return console.error(err);
    let $ = cheerio.load(body);
    const match = $('.match-data', html);
    const goals = $('.goals', html);
    console.log(match.text(), goals.text());  
    });
