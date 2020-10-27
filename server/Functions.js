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
            }
            return elem
        })
        return cases
    },


    checkForNewActs: async function () {
            let i;
            let excels = await fs.readdir('./excels', (err, files) => {
                console.log(files.length)
                i=files.length
            });

             let acts = await fs.readdir('./acts', (err, files) => {
                return files
            });
        console.log(i);


    }
}