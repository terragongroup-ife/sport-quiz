const puppeteer = require('puppeteer');
const fs = require ('fs');

class Scrappercontroller{
    Scrap(req, res){
        let sportUrl = 'https://www.goal.com/en-gb/results/2019-03-03';
        (async () => {
            const browser = await puppeteer.launch({headless: true});
            const page = await browser.newPage();
            await page.setViewport({width: 1920, height: 926 });
            await page.goto(sportUrl);
            // try {
            //         await page.goto(sportUrl);
            // }
            // catch(err){
            //         console.log({
            //                 error: true,
            //                 message:"connectivity error",
            //                 response: err
            //         });
            // }
            //get sport details
            let sportData = await page.evaluate(() =>{
                let homeData = [];
                let awayData =[];
                //get the sport elements
                let homematchData = document.querySelectorAll('div.team-home');        
                homematchData.forEach((sportelement) => { 
                    let sportJson = {};
                    try { 
                        sportJson.hometeam = sportelement.querySelector('span.team-name').innerText;
                        sportJson.homescore = sportelement.querySelector('span.goals').innerText;                   
                    }
                    catch (exception){
                        console.log('error saving home team details')
                    }
                    homeData.push(sportJson);
                });
                let awaymatchData = document.querySelectorAll('div.team-away');
                awaymatchData.forEach((awayelement) => { 
                    let sportJson = {};
                    try {
                        sportJson.awayteam = awayelement.querySelector('span.team-name').innerText;
                        sportJson.awayscore = awayelement.querySelector('span.goals').innerText;
                    }
                    catch (exception){
                        console.log('error saving away team details')
                    }
                    awayData.push(sportJson);
                });
                return homeData.concat(awayData);  
                    
            });
            // console.log(JSON.stringify(sportData, null, 2));
            let formQue = JSON.stringify(sportData, null, 2);
            let homeTeamArr = []; 
            let homeScoreArr =[]; 
            let question = [];     
            for (var j=0; j<sportData.length/2; j++){
                const hometeam = sportData[j].hometeam;
                const homescore = sportData[j].homescore;
                homeTeamArr.push(hometeam);
                homeScoreArr.push(homescore);
                
            }
            let awayTeamArr = [];
            let awayScoreArr =[];
            for (var i=sportData.length/2; i<sportData.length; i++){         
                const awayteam = sportData[i].awayteam;
                const awayscore = sportData[i].awayscore;
                awayScoreArr.push(awayscore);
                awayTeamArr.push(awayteam);
            }

            for ( i=0; i<homeTeamArr.length; i++){
                let sportQueJson = {};
                sportQueJson.question = 'what is the score between ' + homeTeamArr[i] + ' vs ' +awayTeamArr[i] ;
                sportQueJson.answer = homeScoreArr[i]+ ':' +awayScoreArr[i];
                question.push(sportQueJson);    
            }
            // console.log(question);
            // fs.writeFile('question3.json', JSON.stringify(question, null, 2), (err, data)=>{
            //     if (err) {
            //         console.log(err);
            //     }
            //     else{
            //         console.log("File written successfully");
            //     }
            // })
            res.send(question);
        })();

    }

}
const scrapperController = new Scrappercontroller();
module.exports = scrapperController;