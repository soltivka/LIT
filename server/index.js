const Functions = require('./Functions.js');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3001;
const bodyParser = require('body-parser')


app.use(cors());
app.use(bodyParser.json())


app.listen(port, '0.0.0.0', () => {
    console.log(`server starting at ${port}`)
})


app.get('/', (req, res) => {
    console.log("new user conected")
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

const searchForNewActs = async function (){
    let newActs = await Functions.getNewActs();
    newActs.forEach(Functions.createActObject);
}
const serverStarting = async function () {
    Functions.writeLog('________________')
    Functions.writeLog('________________')
    Functions.writeLog('________________')
    Functions.writeLog(' Запуск сервера')
    let newActs = await Functions.getNewActs();
    newActs.forEach(Functions.createActObject);
    Functions.getAllCases_FactPages();
}
serverStarting().then(() => {
    console.log('server works, congrats!');
    console.log("___________________________________")
    let boundGetAllCases_FactPages = Functions.getAllCases_FactPages.bind(Functions)
    let boundSaveDB = Functions.saveDB.bind(Functions)
    setInterval(boundGetAllCases_FactPages, 345600000);//3600000 = 1hr
    setInterval(searchForNewActs, 60000);
    setInterval(boundSaveDB,3600000);
})


app.get('/getCases', (req, res) => {
    let userInfo = Functions.getUserInfoFromJSON(req.headers.userhash);
    let casesForUser = Functions.getCasesForUser(userInfo);
    res.send({casesForUser, userInfo});
});
app.get('/casesForSearch', (req, res) => {
    let userInfo = Functions.getUserInfoFromJSON(req.headers.userhash);
    let casesForSearch = Functions.getCasesForSearch(userInfo);
    res.send({casesForSearch, userInfo})
})


app.get('/changeAdminOperation', (req, res) => {

    if (Functions.changeAdminOperation(req.headers.userhash, req.headers.newoperation)) {
        let userInfo = Functions.getUserInfoFromJSON(req.headers.userhash);
        let casesForUser = Functions.getCasesForUser(userInfo)
        res.send({casesForUser, userInfo})
    } else {
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
    let message = Functions.resetUserStats(userhash);
    console.log("пользователь " + userhash + "сбросил статистику всех юзеров");
    Functions.writeLog("пользователь " + userhash + "сбросил статистику всех юзеров")
    res.send([message]);
});

app.get('/projectStats', (req, res) => {
    let userhash = req.headers.userhash
    if (Functions.checkUserIsAdmin(userhash)) {
        let allActsStats = Functions.getProjectStatsByActs()
        let allDatesStats = Functions.getProjectStatsByDates()
        console.log('we are here')

        res.send({allActsStats, allDatesStats})
    } else {
        res.send(["you shall not pass"])
    }
});
app.get('/getUsersStats', (req, res) => { // переключение на вкладку користувачі
    let userhash = req.headers.userhash;
    let usersStats = Functions.getDateUsersStats(userhash);
    res.send(usersStats)
})

app.get('/getUsersStatsByActs',(req,res)=>{
    if(Functions.checkUserIsAdmin(req.headers.userhash)){
        let statsOperation=req.headers.statsoperation;
        let allActsStats=Functions.getUsersStatsByActs(statsOperation)
        res.send(allActsStats)
    }

})

app.get('/getUsersStats2',(req,res)=>{
    if(Functions.checkUserIsAdmin(req.headers.userhash)){
        let statsOperation=req.headers.statsoperation;
        let allDatesStats=Functions.getUsersStats(statsOperation)
       res.send(allDatesStats)
    }

})

app.post('/createNewUser', (req, res) => {
    let userhash = req.headers.userhash
    if (Functions.checkUserIsAdmin(userhash)) {
        let answer = Functions.createNewUser(req.body)
        res.send(answer)
    } else {
        let answer = "У Вас недостаточно прав"
        res.send(answer)
    }
})
app.get('/deleteUser',(req,res)=>{
    let userhash=req.headers.userhash;
    if(Functions.checkUserIsAdmin(userhash)){
        let userToDelete=req.headers.usertodelete
        let answer=Functions.deleteUser(userToDelete)
        res.send(answer)
    }else {
        let answer = "У Вас недостаточно прав"
        res.send(answer)
    }
})
app.get('/getCaseToHardChange',(req,res)=>{
    let userhash=req.headers.userhash;
    if(Functions.checkUserIsAdmin(userhash)){
        let caseToHardChange_id=req.headers.casetochange
        let caseToChange=Functions.getAllCases().find((existCase)=>existCase.id===caseToHardChange_id)

        res.send(caseToChange)
    }else {
        let answer = "У Вас недостаточно прав"
        res.send(answer)
    }
})
app.post('/postHardChangeCase',(req,res)=>{
    let userhash=req.headers.userhash;
    if(Functions.checkUserIsAdmin(userhash)){
        let hardChangedCase = req.body
        let answer = Functions.applyHardChangedCase(hardChangedCase)
        res.send(answer)

    }else {
        let answer = "У Вас недостаточно прав"
        res.send(answer)
    }
})



app.use(express.static('build'));


