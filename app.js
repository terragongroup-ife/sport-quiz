const rp = require ('request-promise');
const $ = require ('cheerio');
const url = 'https://www.goal.com/en-gb/live-scores';

rp(url)
.then (function(html){
    const match = $('.match-data', html).text();
    const goals = $('.goals', html).text();
    console.log(match, goals);
           
})
.catch(function(){
//handle error
})