const Functions = require('./Functions.js');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3001;
app.use(cors());

app.listen(port, '0.0.0.0',() => {
    console.log(`server starting at ${port}`)
})


app.get('/', (req, res) => {
    console.log("new user conected")
    res.sendFile(path.join(__dirname + '/build/index.html'));
})


const serverStarting = async function () {
    console.log('looking for new acts.xml in ./excels')
    let newActs = await Functions.getNewActs();
    console.log(newActs.length + '  new acts found: ' + newActs)
    newActs.forEach(Functions.createActObject)

}
serverStarting().then(() => console.log('server works, congrats!'))


app.get('/getCases',(req, res) => {
    let userhash = req.headers.userhash
    let userInfo = Functions.getUserInfo(userhash)
    let casesForUser = Functions.getCasesForUser(userInfo);
    res.send({casesForUser, userInfo});
});

app.get('/postChangedCases', (req, res) => {
    let userhash = req.headers.userhash
    let changedCases = JSON.parse(req.headers["changedcases"])
    Functions.applyChangesToCases(userhash,changedCases)
    let userInfo = Functions.getUserInfo(userhash)
    let casesForUser = Functions.getCasesForUser(userInfo);
    res.send({casesForUser});
});


app.use(express.static('build'));


