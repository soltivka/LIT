const fs = require('fs');
const path = require('path');
const excelToJson = require("convert-excel-to-json");
const moment = require("moment");
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
        let date = moment().format("MMM Do YY");
        const createCaseObjects = function ({freshJson, actNumber, date}) {
            let cases = [];
            freshJson.forEach((el, i) => {
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

                    elem.scanDateStart=''
                    elem.scanDateFinish = ''
                    elem.scaner = ''
                    elem.pages = ''
                    elem.scanNumber = ''

                    elem.jointDate = ''
                    elem.jointer = ''

                    elem.comment = ''
                    elem.isDone= false
                    elem.isDoneDate=''
                }
                if(elem.id){cases.push(elem)}
            })
            return cases
        }
        let actObject = createCaseObjects({freshJson, actNumber: el, date})
        console.log("Создан новый акт, в нем  _"+ actObject.length+ "_  дел")
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
    checkUserIsAdmin: function(userhash){
        let allUsersInfo = this.getAllUsersInfo();
        let userInfo = this.getUserInfo(userhash, allUsersInfo);
        return userInfo["isAdmin"];
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
                    } else if (operation === "scaner" && el.stitcher && el.scanDateFinish === '') {
                        casesForUser.push(el);
                    } else if (operation === "jointer" && el.stitcher && el.scanDateFinish && el.jointer === '') {
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
    checkActsWhatNeedToParse:function(actNames,changedCases){
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
                    }
                }
            })
        });
        return fileNamesToChange
    },


    applyChangesToCases: function (userhash, changedCases) {
        console.log("applyChanges started")
        let allUsersInfo = this.getAllUsersInfo();
        let userInfo = this.getUserInfo(userhash, allUsersInfo);
        let fileNames = fs.readdirSync(pathes.acts);
        let actNames = fileNames.map((el) => el.split('.')[0])
        let fileNamesToChange = this.checkActsWhatNeedToParse(actNames,changedCases)
        let actsToChange = fileNamesToChange.length;

        console.log("Оператор " + userInfo["id"] + " вносит изменения в " + actsToChange + " актов : " + fileNamesToChange.join(' | '))
        fileNamesToChange.forEach((act_json) => {
            let act = JSON.parse(fs.readFileSync(path.join(pathes.acts + `/${act_json}`), 'utf8'))
            act.forEach((fileCase) => {                                                                     //перебираем каждый элемент из каждого акта
                changedCases.forEach((changedCase) => {                                                       //сравниваем с каждым элементом измененного списка
                    if (fileCase.index === changedCase.index) {                                                 //<<===получили нужное дело
                        if (userInfo["operation"] === "stitcher") {
                            fileCase.stitcher = userInfo["id"];
                            fileCase.stitchDate=changedCase.stitchDate===''?moment().format("MMM Do YY"):changedCase.stitchDate

                            userInfo["cases"]++;
                            userInfo["pages"] = Number(userInfo["pages"]) + Number(fileCase.expectedPages)

                        } else if (userInfo["operation"] === "scaner") {                                       // вносим изменения, если юзер сканировщик
                            fileCase.scaner = userInfo["id"];
                            if(fileCase.scanDateStart===''){
                                fileCase.scanDateStart=changedCase.scanDateStart===''?
                                    moment().format("MMM Do YY"):changedCase.scanDateStart
                            }else{
                                fileCase.pages = changedCase.pages;
                                fileCase.scanNumber = changedCase.scanNumber;
                                fileCase.scanDateFinish=changedCase.scanDateFinish===''?
                                    moment().format("MMM Do YY"):changedCase.scanDateStart
                                userInfo["cases"]++;
                                userInfo["pages"] = Number(userInfo["pages"]) + Number(fileCase.pages);

                                let stitcherId = fileCase.stitcher;
                                let stitcher = allUsersInfo.find((el) => el["id"] === stitcherId);             //добавляем данные к другим пользователям (кол-во страниц)
                                stitcher["pages"] = Number(stitcher["pages"])
                                    + Number(fileCase.pages)
                                    - Number(fileCase.expectedPages);
                            }

                        } else if (userInfo["operation"] === "jointer") {                                        //вносим изменения, если юзер сшивка
                            fileCase.jointer = userInfo["id"];
                            fileCase.jointDate=changedCase.jointDate===''?moment().format("MMM Do YY"):changedCase.jointDate
                            userInfo["cases"]++;
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
    },


    //actName : type === "123.json"
    handOverCases: function (userhash, changedCases){
        let wrongCases=[];
        if(this.checkUserIsAdmin(userhash)){

            let fileNames = fs.readdirSync(pathes.acts);
            let actNames = fileNames.map((el) => el.split('.')[0])
            let fileNamesToChange = this.checkActsWhatNeedToParse(actNames,changedCases);
            fileNamesToChange.forEach((act_json) => {
                let act = JSON.parse(fs.readFileSync(path.join(pathes.acts + `/${act_json}`), 'utf8'))
                act.forEach((fileCase) => {                                                                     //перебираем каждый элемент из каждого акта
                    changedCases.forEach((changedCase) => {                                                       //сравниваем с каждым элементом измененного списка
                        if (fileCase.index === changedCase.index) {                                             //<<===получили нужное дело

                            if(fileCase.stitcher!==''&&fileCase.scanDateFinish!==''&&fileCase.jointer!==''&&fileCase.isDone===false){            //проверка, что дело расшито, отсканено, сшито.
                                fileCase.isDone=true;
                                fileCase.isDoneDate=moment().format("MMM Do YY");
                            }else{
                                wrongCases.push(changedCase);
                            }
                        }
                    })
                    fs.writeFileSync(path.join(pathes.acts + `/${act_json}`), JSON.stringify(act), {flag: 'w'});    //сохранить новую версию акта здеся
                })
            })
        }
        return wrongCases;
    },

    getCasesForSearch: function(userInfo){
        if(userInfo){
            let fileNames = fs.readdirSync(pathes.acts);
            let allCases = [];
            fileNames.forEach((el) => {
                let act = JSON.parse(fs.readFileSync(path.join(pathes.acts + `/${el}`), 'utf8'))
                act.forEach((el) => {
                    if(el.index){
                        allCases.push(el)
                    }
                })
            })
            console.log("operator " + userInfo["id"] + " got caseList for search= " + allCases.length + " cases")
            return allCases
        }else{
            return ["ERROR: userInfo not match"]
        }
    },
    resetUserStats:function(userInfo){
        if(this.checkUserIsAdmin(userInfo)){
            let allUsers = this.getAllUsersInfo();
            allUsers.forEach((el)=>{
                el["pages"]=0;
                el["cases"]=0;
            })
            fs.writeFileSync(pathes.users, JSON.stringify(allUsers), {flag: 'w'});
            return ("Статистика пользователей сброшена")
        }else{return("Тебе нельзя нажимать эту кнопку")}
    }

}