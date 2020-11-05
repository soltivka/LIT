const fs = require('fs');
const path = require('path');
const excelToJson = require("convert-excel-to-json");
const pathes = {
    excels: path.join(__dirname + `/../../data/excels`),
    acts: path.join(__dirname + `/../../data/acts`),
    users: path.join(__dirname + `/../../data/users.json`)
}

module.exports = {

    createActObject: function (el) {                                                                        //парсит новый акт в excel , сохраняет его в JSON
        console.log('parcing new excel: ' + el + '.xls');
        console.log(path.join(pathes.excels + `/${el}.xls`))
        let freshJson = excelToJson({
            sourceFile: path.join(pathes.excels + `/${el}.xls`)
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

                    elem.stitchDate = ''
                    elem.stitcher = ''
                    elem.stitcherhash = ''

                    elem.scanDate = ''
                    elem.scaner = ''
                    elem.scanerhash = ''
                    elem.pages = ''
                    elem.scanNumber = ''

                    elem.jointDate = ''
                    elem.jointer = ''
                    elem.jointerhash = ''

                    elem.comment = ''
                }
                return elem
            })
            return cases
        }
        let actObject = createCaseObjects({freshJson, actNumber: el, date})
        fs.writeFileSync(path.join(pathes.acts + `/${el}.json`), JSON.stringify(actObject));

    },


    getNewActs: async function () {
        let promisificate = function () {                                                                       //отслеживает добавление нового акта и возвращает его название
            return new Promise((resolve, reject) => {

                fs.readdir(pathes.excels, (err, excels) => {
                    if (err) {
                        reject(err)
                    } else {
                        fs.readdir(pathes.acts, (err, acts) => {
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
        return promisificate().then((resolve) => {
            let excels = resolve.excels;
            let excelNames = excels.map((el) => el.split('.')[0]);
            let acts = resolve.acts;
            let actNames = acts.map((el) => el.split('.')[0]);

            const diff = function (a1, a2) {
                return a1.filter(i => !a2.includes(i))
            }
            return diff(excelNames, actNames)
        })
    },
    getAllUsersInfo: function () {                                                          //прочитать из файла все данные о всех пользователях
        return JSON.parse(fs.readFileSync(pathes.users, 'utf8'))
    },


    getUserInfoFromJSON: function (userhash) {                                                    // вся инфа о пользователе  из users.json
        let userInfo = JSON.parse(fs.readFileSync(pathes.users, 'utf8'))
            .filter((el) => el.userhash === userhash)
        return userInfo[0];
    },
    getUserInfo: function (userhash, allUsersInfo) {
        return allUsersInfo.filter((el) => el.userhash === userhash)[0]
    },


    getCasesForUser: function (userInfo) {
        if (userInfo) {
            let operation = userInfo["operation"];
            let fileNames = fs.readdirSync(pathes.acts);
            let casesForUser = [];
            fileNames.forEach((el) => {
                let act = JSON.parse(fs.readFileSync(path.join(pathes.acts + `/${el}`), 'utf8'))
                act.forEach((el) => {
                    if (operation === "stitcher" && el.stitcher === '') {
                        casesForUser.push(el);
                    } else if (operation === "scaner" && el.stitcher && el.scaner === '') {
                        casesForUser.push(el);
                    } else if (operation === "jointer" && el.stitcher && el.scaner && el.jointer === '') {
                        casesForUser.push(el);
                    }
                })
            })
            console.log("operator " + userInfo["id"] + " got caseList = " + casesForUser.length + " cases")
            return casesForUser
        } else {
            console.log("Error: getCasesForUser(server/Functions.js) -- userInfo not match");
            return ['Error: getCasesForUser(server/Functions.js) -- userInfo not match']
        }
    },


    applyChangesToCases: function (userhash, changedCases) {
        console.log("applyChanges started")
        let actsToChange = 0;
        let allUsersInfo = this.getAllUsersInfo();
        let userInfo = this.getUserInfo(userhash, allUsersInfo);
        let fileNames = fs.readdirSync(pathes.acts);
        let actNames = fileNames.map((el) => el.split('.')[0])
        let fileNamesToChange = [];
        actNames.forEach((actName) => {
            changedCases.forEach((changedCase) => {
                if (Number(actName) === Number(changedCase.act)) {
                    let alreadyExists = false;
                    fileNamesToChange.forEach((existName) => {
                        if (Number(existName.split('.')[0]) === Number(changedCase.act)) {
                            alreadyExists = true;
                        }
                    })
                    if (alreadyExists) {
                    } else {
                        fileNamesToChange.push(actName + ".json");
                        actsToChange++
                    }
                }
            })
        });
        console.log("Оператор " + userInfo["id"] + " вносит изменения в " + actsToChange + " актов : " + fileNamesToChange.join(' | '))
        fileNamesToChange.forEach((act_json) => {
            let act = JSON.parse(fs.readFileSync(path.join(pathes.acts + `/${act_json}`), 'utf8'))
            act.forEach((fileCase) => {                                                                     //перебираем каждый элемент из каждого акта
                changedCases.forEach((changedCase) => {                                                       //сравниваем с каждым элементом измененного списка
                    if (fileCase.index === changedCase.index) {                                                 //<<===получили нужное дело
                        if (userInfo["operation"] === "stitcher") {
                            fileCase.stitcher = userInfo["id"];
                            fileCase.stitcherhash = userInfo["userhash"];
                            userInfo["acts"]++;
                            userInfo["pages"] = Number(userInfo["pages"]) + Number(fileCase.expectedPages)

                        } else if (userInfo["operation"] === "scaner") {                                       // вносим изменения, если юзер сканировщик
                            fileCase.scaner = userInfo["id"];
                            fileCase.scanerhash = userInfo["userhash"];
                            fileCase.pages = changedCase.pages;
                            fileCase.scanNumber = changedCase.scanNumber;
                            userInfo["acts"]++;
                            userInfo["pages"] = Number(userInfo["pages"]) + Number(fileCase.pages);

                            let stitcherhash = fileCase.stitcherhash;
                            let stitcher = allUsersInfo.find((el) => el["userhash"] === stitcherhash);             //добавляем данные к другим пользователям (кол-во страниц)
                            stitcher["pages"] = Number(stitcher["pages"])
                                + Number(fileCase.pages)
                                - Number(fileCase.expectedPages);

                        } else if (userInfo["operation"] === "jointer") {                                        //вносим изменения, если юзер сшивка
                            fileCase.jointer = userInfo["id"];
                            fileCase.jointerhash = userInfo["userhash"];
                            userInfo["acts"]++;
                            userInfo["pages"] = Number(userInfo["pages"]) + Number(fileCase.pages)
                        }
                    }
                })
                fs.writeFileSync(path.join(pathes.acts + `/${act_json}`), JSON.stringify(act), {flag: 'w'});    //сохранить новую версию акта здеся
                fs.writeFileSync(pathes.users, JSON.stringify(allUsersInfo), {flag: 'w'});                       // обновить статы юзера
            })
        })
    },

    changeAdminOperation: function (userhash, newOperation) {
        let allUsersInfo = this.getAllUsersInfo();
        let userInfo = this.getUserInfo(userhash, allUsersInfo);
        if (userInfo["isAdmin"] === true) {
            userInfo["operation"] = newOperation;
            console.log(userInfo["id"] + " сменил профессию на " + newOperation)
            fs.writeFileSync(pathes.users, JSON.stringify(allUsersInfo), {flag: 'w'});
            return true
        } else return false
    }
}