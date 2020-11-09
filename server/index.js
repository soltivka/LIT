const Functions = require('./Functions.js');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3001;
app.use(cors());

app.listen(port, '0.0.0.0', () => {
    console.log(`server starting at ${port}`)
})


app.get('/', (req, res) => {
    console.log("new user conected")
    res.sendFile(path.join(__dirname + '/build/index.html'));
})


const serverStarting = async function () {
    console.log('looking for new acts.xml in data/excels')
    let newActs = await Functions.getNewActs();
    console.log(newActs.length + '  new acts found: ' + newActs)
    newActs.forEach(Functions.createActObject)

}
serverStarting().then(() => {
    console.log('server works, congrats!');
    console.log("___________________________________")
})


app.get('/getCases', (req, res) => {
    let userInfo = Functions.getUserInfoFromJSON(req.headers.userhash);
    let casesForUser = Functions.getCasesForUser(userInfo);
    res.send({casesForUser, userInfo});
});
app.get('/casesForSearch',(req,res)=>{
    let userInfo=Functions.getUserInfoFromJSON(req.headers.userhash);
    let casesForSearch=Functions.getCasesForSearch(userInfo);
    res.send({casesForSearch,userInfo})
})


app.get('/changeAdminOperation', (req, res) => {
    console.log(req.headers.newoperation)
    if (Functions.changeAdminOperation(req.headers.userhash, req.headers.newoperation)) {
        let userInfo = Functions.getUserInfoFromJSON(req.headers.userhash);
        let casesForUser = Functions.getCasesForUser(userInfo)
        res.send({casesForUser, userInfo})
    }else{
        res.send(["ERROR:__you have no access"])
    }
});
app.get('/handOverCases', (req, res) => {
    let userhash = req.headers.userhash
    let changedCases = JSON.parse(req.headers["changedcases"])
    let wrongCaseList = Functions.handOverCases(userhash, changedCases)
    //функция вносит изменения в сделанные дела, возвращает те, отметить сделанными которые невозможно.
    let userInfo = Functions.getUserInfoFromJSON(userhash);
    res.send({wrongCaseList, userInfo});
});


app.get('/postChangedCases', (req, res) => {
    let userhash = req.headers.userhash
    let changedCases = JSON.parse(req.headers["changedcases"])
    Functions.applyChangesToCases(userhash, changedCases)
    let userInfo = Functions.getUserInfoFromJSON(userhash)
    let casesForUser = Functions.getCasesForUser(userInfo);
    res.send({casesForUser, userInfo});
});

app.get('/resetUserStats', (req, res) => {
    let userhash = req.headers.userhash
    let message=Functions.resetUserStats(userhash);
    console.log("пользователь "+ userhash + "сбросил статистику всех юзеров");
    res.send({message});
});


app.use(express.static('build'));


