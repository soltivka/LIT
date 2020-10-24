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
                elem.pages = ''  // надо будет поменять на пустую строку
                elem.stitchDate = ''
                elem.stitcher = 0
            }
            return elem
        })
        return cases
    },

}