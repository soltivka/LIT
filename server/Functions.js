const fs = require('fs');

module.exports = {
    createCaseObjects: function ({freshJson, actNumber, incomeDate}) {
        let cases = freshJson.map((el, i) => {
            let elem = {};
            if (typeof (el.A) === "number") {

                elem.id = el.E
                elem.index = el.F
                elem.act = actNumber
                elem.street = el.B
                elem.adress = el.C
                elem.incomeDate = incomeDate
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
    },


    checkForNewActs: async function () {

        let loadScriptPromise = function () {
            return new Promise((resolve, reject) => {

                fs.readdir('./excels', (err, excels) => {
                    if (err) {
                        reject(err)
                    } else {
                        fs.readdir('./acts', (err, acts) => {
                            if (err) {
                                reject(err)
                            } else {
                                resolve([excels, acts])
                            }
                        })
                    }
                })
            })
        }
        let promise = loadScriptPromise().then((resolve) => {
            console.log(resolve[0]);
            console.log(resolve[1]);
        });


    }
}