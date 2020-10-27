const Functions = require('./Functions.js');
const express = require('express');
const path = require('path');
const app = express();
const excelToJson = require('convert-excel-to-json');
const cors = require('cors');
const fs = require('fs');
const port = 3001;
app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})


const serverStarting =  async function () {
    let result = await Functions.checkForNewActs();

}
serverStarting().then(()=>console.log('done'))


app.get('/1', (req, res) => {
    res.send({sometext: 'sometext'});
});

app.listen(port, () => {
    console.log(`server starting at ${port}`)
})

app.use(express.static('build'));


