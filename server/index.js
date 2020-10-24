
const Functions = require('./Functions.js');
const express = require('express');
const path = require('path');
const app = express();
const excelToJson = require('convert-excel-to-json');
const cors = require('cors');
const port = 3001;

const freshJson = excelToJson({
    sourceFile: './acts/121.xls'
})["Аркуш1"];
console.log(Functions.createCaseObjects({freshJson,actNumber:222,incomeDate:'23.10.2020'}));

app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
})
app.get('/1', (req, res) => {
    console.log(req.headers.user);
    res.send({someData:"someData"});
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static('build'));


