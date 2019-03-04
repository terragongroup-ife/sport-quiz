const express = require('express');
const app = express();

app.get('/', async(req, res)=>{
    let arr =[];
    const sportData = require('./Epl16_17/en.1.json');
    const competitonName = sportData.name;

        for (i = 0; i < 10; i++){
            for (j=0; j < 38; j++){
            const rounds = sportData['rounds'][j]['name'];
            const hometeam = sportData.rounds[j].matches[i].team1.name;
            const awayteam = sportData.rounds[j].matches[i].team2.name;
            const homeScore = sportData.rounds[j].matches[i].score1;
            const awayScore = sportData.rounds[j].matches[i].score2
            const question = 'what is the score between ' + hometeam + ' vs ' +awayteam + ' for ' + competitonName;
            const answer = homeScore+ ':' +awayScore;
            await arr.push({ question:question, answer:answer}); 
            }
         } 
         console.log('length of the array', arr.length);
             res.json((arr));      
    })
       
const PORT = 6500;
app.listen(PORT, ()=>{
   console.log('listening on post 6500');
})