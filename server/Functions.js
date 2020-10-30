const fs = require('fs');
const path = require('path');
const excelToJson = require("convert-excel-to-json");

module.exports = {

    createActObject: function (el) {
        console.log('parcing new excel: ' + el + '.xls');
        let freshJson = excelToJson({
            sourceFile: path.join(__dirname + `/excels/${el}.xls`)
        })['Аркуш1'];
        let date = Date.now()
        const createCaseObjects = function ({freshJson, actNumber, date}) {
            let cases = freshJson.map((el, i) => {
                let elem = {};
                if (typeof (el.A) === "number") {

                    elem.id = el.E
                    elem.index = el.F
                    elem.act = actNumber
                    elem.street = el.B
                    elem.adress = el.C
                    elem.incomeDate = date
                    elem.expectedPages = el.G
                    elem.outDate = ''
                    elem.jointDate = ''
                    elem.jointer = 0
                    elem.scanDate = ''
                    elem.scaner = 0
                    elem.pages = ''
                    elem.stitchDate = ''
                    elem.stitcher = 0
                    elem.comment = ''
                }
                return elem
            })
            return cases
        }
        let actObject = createCaseObjects({freshJson, actNumber: el, date})
        fs.writeFileSync(`acts/${el}.json`, JSON.stringify(actObject));

    },


    getNewActs: async function () {

        let promisificate = function () {
            return new Promise((resolve, reject) => {

                fs.readdir('./excels', (err, excels) => {
                    if (err) {
                        reject(err)
                    } else {
                        fs.readdir('./acts', (err, acts) => {
                            if (err) {
                                reject(err)
                            } else {
                                resolve({excels, acts})
                            }
                        })
                    }
                })
            })
        }
        let lostActNames = promisificate().then((resolve) => {
            let excels = resolve.excels;
            let excelNames=excels.map((el)=>el.split('.')[0]);
            let acts = resolve.acts;
            let actNames = acts.map((el)=>el.split('.')[0]);

            const diff = function(a1, a2) {
                return a1.filter(i=>!a2.includes(i))
                    .concat(a2.filter(i=>!a1.includes(i)))
            }
            let lostActNames = diff(excelNames,actNames);



            return lostActNames
        });
        return lostActNames
    }
}