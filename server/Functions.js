const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const excelToJson = require("convert-excel-to-json");
const moment = require("moment");
const settings = {
    currentYear: '2021' //название ГОДА проэкта ( где искать отсканеные странички на сканарче)
}
const pathes = {
    logs: path.join(__dirname + `/../../data/logs`),
    excels: path.join(__dirname + `/../../data/excels`),
    acts: path.join(__dirname + `/../../data/acts`),
    users: path.join(__dirname + `/../../data/users.json`),
    factPagesDir: path.join('D://nas/ScanArch/2021_gotovye'), // убрать D: для билда
    saveDB:path.join((__dirname + `/../../data/saveDB`))
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

                    elem.scanDateStart = ''
                    elem.scanDateFinish = ''
                    elem.scaner = ''
                    elem.pages = ''
                    elem.scanNumber = ''
                    elem.factPages = ''

                    elem.jointDate = ''
                    elem.jointer = ''

                    elem.comment = ''
                    elem.isDone = false
                    elem.isDoneDate = ''
                }
                if (elem.id) {
                    cases.push(elem)
                }
            })
            return cases
        }
        let actObject = createCaseObjects({freshJson, actNumber: el, date})
        console.log("Создан новый акт, в нем  _" + actObject.length + "_  дел")
        fs.writeFileSync(path.join(pathes.acts + `/${el}.json`), JSON.stringify(actObject, null, '\t'));

    },


    getNewActs: async function () {
        console.log('Проверка наличия новых act.xml в  data/excels')
        this.writeLog('Проверка наличия новых act.xml в  data/excels')
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
            let newActs = diff(excelNames, actNames)
            console.log(newActs.length + '  new acts found: ' + newActs)
            return newActs
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
    checkUserIsAdmin: function (userhash) {
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
    checkActsWhatNeedToParse: function (actNames, changedCases) {
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
        let allUsersInfo = this.getAllUsersInfo();
        let userInfo = this.getUserInfo(userhash, allUsersInfo);
        let fileNames = fs.readdirSync(pathes.acts);
        let actNames = fileNames.map((el) => el.split('.')[0])
        let fileNamesToChange = this.checkActsWhatNeedToParse(actNames, changedCases)
        let actsToChange = fileNamesToChange.length;

        console.log("Оператор " + userInfo["id"] + " вносит изменения в " + actsToChange + " актов : " + fileNamesToChange.join(' | '))
        this.writeLog("Оператор " + userInfo["id"] + " вносит изменения в " + actsToChange + " актов : " + fileNamesToChange.join(' | '))
        fileNamesToChange.forEach((act_json) => {
            let act = JSON.parse(fs.readFileSync(path.join(pathes.acts + `/${act_json}`), 'utf8'))
            act.forEach((fileCase) => {                                                                     //перебираем каждый элемент из каждого акта
                changedCases.forEach((changedCase) => {                                                       //сравниваем с каждым элементом измененного списка
                    if (fileCase.index === changedCase.index) {                                                 //<<===получили нужное дело
                        if (userInfo["operation"] === "stitcher") {
                            if (fileCase.stitcher === '') {
                                fileCase.stitcher = userInfo["id"];
                                fileCase.stitchDate = changedCase.stitchDate === '' ? moment().format("MMM Do YY") : changedCase.stitchDate
                                userInfo["cases"]++;
                            }


                        } else if (userInfo["operation"] === "scaner") {                                       // вносим изменения, если юзер сканировщик
                            fileCase.scaner = userInfo["id"];
                            if (fileCase.scanDateStart === '') {
                                fileCase.scanDateStart = changedCase.scanDateStart === '' ?
                                    moment().format("MMM Do YY") : changedCase.scanDateStart
                            } else if (fileCase.scanDateStart !== '' && fileCase.scanDateFinish === '') {
                                fileCase.pages = changedCase.pages;
                                let zeroes = '';
                                while(changedCase.scanNumber.length+zeroes.length<5){
                                    zeroes+='0'
                                }

                                fileCase.scanNumber = zeroes +''+ changedCase.scanNumber;
                                fileCase.scanDateFinish = changedCase.scanDateFinish === '' ?
                                    moment().format("MMM Do YY") : changedCase.scanDateStart
                                userInfo["cases"]++;
                            }

                        } else if (userInfo["operation"] === "jointer" && fileCase.jointer === '') {                                        //вносим изменения, если юзер сшивка
                            fileCase.jointer = userInfo["id"];
                            fileCase.jointDate = changedCase.jointDate === '' ? moment().format("MMM Do YY") : changedCase.jointDate
                            userInfo["cases"]++;
                            if(userInfo["pages"]||userInfo["pages"]=="0"){
                                if(changedCase.factPages){
                                    userInfo["pages"]+=changedCase.factPages
                                }

                            }
                        }
                    }
                })
                fs.writeFileSync(path.join(pathes.acts + `/${act_json}`), JSON.stringify(act, null, '\t'), {flag: 'w'});    //сохранить новую версию акта здеся
                fs.writeFileSync(pathes.users, JSON.stringify(allUsersInfo, null, '\t'), {flag: 'w'});                       // обновить статы юзера
            })
        })
    },

    changeAdminOperation: function (userhash, newOperation) {
        let allUsersInfo = this.getAllUsersInfo();
        let userInfo = this.getUserInfo(userhash, allUsersInfo);
        if (userInfo["isAdmin"] === true) {
            userInfo["operation"] = newOperation;
            console.log(userInfo["id"] + " сменил профессию на " + newOperation)
            fs.writeFileSync(pathes.users, JSON.stringify(allUsersInfo, null, '\t'), {flag: 'w'});
            return true
        } else return false
    },


    //actName : type === "123.json"
    handOverCases: function (userhash, changedCases) {
        let wrongCases = [];
        this.writeLog(userhash + 'сдает дела в архив, '+ changedCases.length +'штук')
        if (this.checkUserIsAdmin(userhash)) {

            let fileNames = fs.readdirSync(pathes.acts);
            let actNames = fileNames.map((el) => el.split('.')[0])
            let fileNamesToChange = this.checkActsWhatNeedToParse(actNames, changedCases);
            fileNamesToChange.forEach((act_json) => {
                let act = JSON.parse(fs.readFileSync(path.join(pathes.acts + `/${act_json}`), 'utf8'))
                act.forEach((fileCase) => {                                                                     //перебираем каждый элемент из каждого акта
                    changedCases.forEach((changedCase) => {                                                       //сравниваем с каждым элементом измененного списка
                        if (fileCase.index === changedCase.index) {                                             //<<===получили нужное дело

                            if (fileCase.stitcher !== '' && fileCase.scanDateFinish !== '' && fileCase.jointer !== '' && fileCase.isDone === false) {            //проверка, что дело расшито, отсканено, сшито.
                                fileCase.isDone = true;
                                fileCase.isDoneDate = moment().format("MMM Do YY");
                            } else {
                                wrongCases.push(changedCase);
                            }
                        }
                    })
                    fs.writeFileSync(path.join(pathes.acts + `/${act_json}`), JSON.stringify(act, null, '\t'), {flag: 'w'});    //сохранить новую версию акта здеся
                })
            })
        }
        this.writeLog(userhash + 'сдает дела в архив, '+ (changedCases.length-wrongCases.length)+' штук')
        return wrongCases;
    },

    getAllCases: function () {
        let fileNames = fs.readdirSync(pathes.acts);
        let allCases = [];
        fileNames.forEach((el) => {
            let act = JSON.parse(fs.readFileSync(path.join(pathes.acts + `/${el}`), 'utf8'))
            act.forEach((el) => {
                if (el.index) {
                    allCases.push(el)
                }
            })
        })
        return allCases
    },

    getCasesForSearch: function (userInfo) {
        if (userInfo) {
            let fileNames = fs.readdirSync(pathes.acts);
            let allCases = [];
            fileNames.forEach((el) => {
                let act = JSON.parse(fs.readFileSync(path.join(pathes.acts + `/${el}`), 'utf8'))
                act.forEach((el) => {
                    if (el.index) {
                        allCases.push(el)
                    }
                })
            })
            console.log("operator " + userInfo["id"] + " got caseList for search= " + allCases.length + " cases")
            return allCases
        } else {
            return ["ERROR: userInfo not match"]
        }
    },
    resetUserStats: function (userInfo) {
        if (this.checkUserIsAdmin(userInfo)) {
            let allUsers = this.getAllUsersInfo();
            allUsers.forEach((el) => {
                el["pages"] = 0;
                el["cases"] = 0;
            })
            fs.writeFileSync(pathes.users, JSON.stringify(allUsers, null, '\t'), {flag: 'w'});
            return ("Статистика пользователей сброшена")
        } else {
            return ("Тебе нельзя нажимать эту кнопку")
        }
    },

    getProjectStatsByActs: function () {
        let fileNames = fs.readdirSync(pathes.acts);
        let allActs = {};
        fileNames.forEach((actName) => {
            let actNumber = actName.split('.')[0];
            let act = JSON.parse(fs.readFileSync(path.join(pathes.acts + `/${actName}`), 'utf8'))                // нужно будет
            allActs[actNumber] = {
                new: {pages:0,cases:0},
                stitcher: {pages:0,cases:0},
                onScan: {pages:0,cases:0},
                scaner: {pages:0,cases:0},
                jointer: {pages:0,cases:0},
                isDone: {pages:0,cases:0},
                startDate: '',
                finishDate: '',
            };
            allActs[actNumber].startDate = act[0].incomeDate
            act.forEach((el) => {
                allActs[actNumber].new.cases++
                allActs[actNumber].new.pages+=Number(el.factPages)
                if (el.stitcher !== '') {
                    allActs[actNumber].stitcher.cases++
                    allActs[actNumber].stitcher.pages+=Number(el.factPages)
                }
                if (el.scaner !== '' && el.scanDateStart !== '') {
                    allActs[actNumber].onScan.cases++
                    allActs[actNumber].onScan.pages+=Number(el.factPages)
                }
                if (el.scanDateFinish !== '') {
                    allActs[actNumber].scaner.cases++
                    allActs[actNumber].scaner.pages+=Number(el.factPages)
                }
                if (el.jointer !== '') {
                    allActs[actNumber].jointer.cases++
                    allActs[actNumber].jointer.pages+=Number(el.factPages)
                }
                if (el.isDone === true) {
                    allActs[actNumber].isDone.cases++
                    allActs[actNumber].isDone.pages+=Number(el.factPages)
                }
            })
            if (allActs[actNumber].new.cases === allActs[actNumber].isDone.cases) {
                let latestMoment = 0;
                act.forEach((el) => {
                    let finishDate = this.getMomentFromDateString(el.isDoneDate)
                    if (latestMoment === 0) {
                        latestMoment = finishDate;
                    } else {
                        if (finishDate.isAfter(latestMoment)) {
                            latestMoment = finishDate;
                        }
                    }
                })
                allActs[actNumber].finishDate = latestMoment.format(("MMM Do YY"))
            }
        })
        return allActs
    },
    getMomentFromDateString: function (dateString) {

        let splitDate = dateString.split(' ')
        let stringDay = splitDate[1];
        let day = parseInt(stringDay.replace(/[^\d]/g, ''))
        let month = splitDate[0]
        let year = splitDate[2]
        let finishDate = moment().date(day)
        finishDate.month(month)
        finishDate.year(Number(year))
        finishDate.startOf("day");
        return finishDate


    },

    getAllDates: function () {
        let allCases = this.getAllCases()
        let allDates = [];
        allCases.forEach((el) => {
            if (typeof (allDates.find((existDate) => existDate === el.incomeDate)) === 'undefined') {
                allDates.push(el.incomeDate)
            }
            if (typeof (allDates.find((existDate) => existDate === el.stitchDate)) === 'undefined') {
                allDates.push(el.stitchDate)
            }
            if (typeof (allDates.find((existDate) => existDate === el.scanDateFinish)) === 'undefined') {
                allDates.push(el.scanDateFinish)
            }
            if (typeof (allDates.find((existDate) => existDate === el.jointDate)) === 'undefined') {
                allDates.push(el.jointDate)
            }
            if (typeof (allDates.find((existDate) => existDate === el.isDoneDate)) === 'undefined') {
                allDates.push(el.isDoneDate)
            }
        })
        let emptyIndex = allDates.findIndex((string) => string === '')
        allDates.splice(emptyIndex, 1);

        allDates.sort((a, b) => {
            let momentA = this.getMomentFromDateString(a);
            let momentB = this.getMomentFromDateString(b);
            if (momentA.isBefore(momentB)) {
                return -1
            } else if (momentA.isAfter(momentB)) {
                return 1
            } else return 0
        })
        return allDates
    },

    getProjectStatsByDates: function () {
        let allDates = this.getAllDates()
        let allCases = this.getAllCases()

        let allDateStats = {}
        allDates.forEach((date) => {
            allDateStats[date] = {
                new: {cases:0,pages:0},
                stitcher: {cases:0,pages:0},
                onScan: {cases:0,pages:0},
                scaner: {cases:0,pages:0},
                jointer: {cases:0,pages:0},
                isDone: {cases:0,pages:0},
            };
            allCases.forEach((el) => {
                if (el.incomeDate === date) {
                    allDateStats[date].new.cases++
                    allDateStats[date].new.pages+=Number(el.factPages?el.factPages:0)
                }
                if (el.stitchDate === date) {
                    allDateStats[date].stitcher.cases++
                    allDateStats[date].stitcher.pages+=Number(el.factPages?el.factPages:0)
                }
                if (el.scanDateStart === date) {
                    allDateStats[date].onScan.cases++
                    allDateStats[date].onScan.pages+=Number(el.factPages?el.factPages:0)
                }
                if (el.scanDateFinish === date) {
                    allDateStats[date].scaner.cases++
                    allDateStats[date].scaner.pages+=Number(el.factPages?el.factPages:0)
                }
                if (el.jointDate === date) {
                    allDateStats[date].jointer.cases++
                    allDateStats[date].jointer.pages+=Number(el.factPages?el.factPages:0)
                }
                if (el.isDoneDate === date) {
                    allDateStats[date].isDone.cases++
                    allDateStats[date].isDone.pages+=Number(el.factPages?el.factPages:0)
                }
            })
        })
        return allDateStats
    },

    getDateUsersStats: function () {
        let allUsersInfo = this.getAllUsersInfo();


        return allUsersInfo
    },

    createNewUser: function (newUserInfo) {
        let newUser = {
            "userhash": newUserInfo.userhash,
            "id": newUserInfo.id,
            "name": newUserInfo.name,
            "isAdmin": newUserInfo.isAdmin,
            "cases": 0,
            "pages": 0,
            "operation": newUserInfo.operation
        };
        let answer = '';
        let allUsersInfo = this.getAllUsersInfo();
        let isExist = allUsersInfo.find((existUser) => {
            return existUser.userhash === newUser.userhash
        });

        if (!isExist) {
            isExist = allUsersInfo.find((existUser) => existUser.id === newUser.id);
        } else {
            console.log("недопустимое значение #" + newUser.userhash)
            answer = "недопустимое значение #" + newUser.userhash
            return answer
        }
        if (!isExist) {
            allUsersInfo.push(newUser);
            fs.writeFileSync(pathes.users, JSON.stringify(allUsersInfo, null, '\t'), {flag: 'w'});
            console.log("новый пользователь добавлен");
            answer = 'новый пользователь добавлен';
            return answer
        } else {
            console.log("недопустимое значение, проверьте данные")
            answer = "недопустимое значение, проверьте данные";
            return answer
        }
    },

    deleteUser: function (userToDelete) {
        let allUsers = this.getAllUsersInfo();
        let objectToDelete = allUsers.find((user) => {
            return user.id === userToDelete
        })
        if (objectToDelete) {
            let userToDeleteIndex = allUsers.indexOf(objectToDelete)
            allUsers.splice(userToDeleteIndex, 1)
            fs.writeFileSync(pathes.users, JSON.stringify(allUsers, null, '\t'), {flag: 'w'});
            return ("Пользователь №" + userToDelete + " удален")
        } else {
            return ("Пользователь №" + userToDelete + " не найден")
        }
    },
    applyHardChangedCase: function (hardChangedCase) {

        let act = JSON.parse(fs.readFileSync(path.join(pathes.acts + `/${hardChangedCase.act}.json`), 'utf8'))
        let caseToChange = act.find((existCase) => {
            return existCase.id === hardChangedCase.id
        })
        for (let field in caseToChange) {
            // let zeroes = '';
            // while(changedCase.scanNumber.length+zeroes.length<5){
            //     zeroes+='0'
            // }
            //
            // fileCase.scanNumber = zeroes +''+ changedCase.scanNumber;

            if(field==="factPages" && caseToChange[field] !== hardChangedCase[field]){
                caseToChange[field] = hardChangedCase[field]
                console.log(caseToChange[field] , hardChangedCase[field])
            }
            if (caseToChange[field] && caseToChange[field] !== hardChangedCase[field]) {
                caseToChange[field] = hardChangedCase[field]

                console.log(caseToChange[field] , hardChangedCase[field])
            }

        }
        this.writeLog('перезапись файла ' + JSON.stringify(caseToChange))
        console.log(path.join(pathes.acts + `/${hardChangedCase.act}.json`));
        fs.writeFileSync(path.join(pathes.acts + `/${hardChangedCase.act}.json`), JSON.stringify(act, null, '\t'), {flag: 'w'});
        return "Акт № " + hardChangedCase.act + " перезаписан"
    },

    getUsersStatsByActs:function(){
        return({response:"userstatsByActs got"})

    },


    getUsersStats: function (statsOperation) {
        let operationDate = statsOperation.split('er')[0] === "scan" ? statsOperation.split('er')[0] + "DateFinish" : statsOperation.split('er')[0] + "Date"
        let allUsersInfo=this.getAllUsersInfo();
        let getUserName = function(userNumber){
            let userObject = allUsersInfo.find((anyUser)=>{

                return anyUser["id"]===userNumber
            })
            return userObject.name
        }
        let allCases = this.getAllCases();
        let operation_notEmpty_cases = allCases.filter((el) => {
            return (el[statsOperation] !== '' && el[operationDate] !== '')
        })
        let dates = [];
        let allDatesObj = {};
        operation_notEmpty_cases.forEach((el) => {
            let dateIsExist = dates.find((date) => {
                return el[operationDate] === date
            })
            if (!dateIsExist) {
                dates.push(el[operationDate])
            }
        })
        dates = dates.sort((a, b) => {
            let momentA = this.getMomentFromDateString(a);
            let momentB = this.getMomentFromDateString(b);
            if (momentA.isBefore(momentB)) {
                return -1
            } else if (momentA.isAfter(momentB)) {
                return 1
            } else return 0
        })

        let holydaysFiller = function(dates){
            let filledByHolydays=[]
            dates.forEach((date,index,arr)=>{
                let loosedDates=[];
                filledByHolydays.push(date);
                let dateSplitter = function(dateString){
                    let dateNumber = dateString.split(' ')[1];
                    dateNumber = dateNumber.split('nd')[0];
                    dateNumber = dateNumber.split('th')[0];
                    dateNumber = dateNumber.split('rd')[0];
                    dateNumber = dateNumber.split('st')[0];
                    if(dateNumber)return Number(dateNumber)
                }
                let currentNumber = dateSplitter(date);
                let nextNumber = dates[index+1]?dateSplitter(dates[index+1]):undefined
                if(nextNumber<currentNumber){
                    return}
                let difference = nextNumber-currentNumber;
                for(let i=0; i<difference-1;i++){
                    filledByHolydays.push(date.split(' ')[0]+' '+(currentNumber+i+1)+'th '+date.split(' ')[2])
                    console.log("в статистику влита дата" +date.split(' ')[0]+' '+(currentNumber+i+1)+'th '+date.split(' ')[2] )
                }

            })
            return filledByHolydays
        }
        let datesWithHolydays = holydaysFiller(dates)
        datesWithHolydays.forEach((date) => {
            let dateObj = {}
            let casesWithThisDate = operation_notEmpty_cases.filter((el) => {
                return el[operationDate] === date;
            })
            casesWithThisDate.forEach((el) => {
                if (dateObj[el[statsOperation]]) {
                    dateObj[el[statsOperation]].cases++
                    dateObj[el[statsOperation]].pages+=Number(el.factPages)
                } else {
                    dateObj[el[statsOperation]] = {
                        cases:1,
                        pages:Number(el.factPages),
                        name:getUserName(el[statsOperation])
                    }
                }
            })
            allDatesObj[date] = dateObj;

        })
        console.log("статистика по " + statsOperation)
        console.log(allDatesObj)
        return allDatesObj

    },
    getCaseFactPages: function (caseObj) {
        let mainpath = pathes.factPagesDir
        let operator = caseObj.scaner;
        let scanIndex = caseObj.scanNumber;
        let dirPath = path.join(mainpath, '/' + operator, '/' + settings.currentYear + '-' + operator + '-' + scanIndex);

        let pageNames;
        if (fs.existsSync(dirPath)) {
            pageNames = fs.readdirSync(dirPath)
            console.log("найдено дело с " + pageNames.length + " количеством страниц")
        } else pageNames = []

        return pageNames.length
    },

    getAllCases_FactPages: function () {                    //получить данные о количестве страниц со сканарча
        let allCases = this.getAllCases();
        let casesToFindFactPages = allCases.filter((el) => {
            return el.factPages === '' && el.scaner !== ''
        })
        console.log('проверяю фактическое количество страниц в отсканированных делах: ' + casesToFindFactPages.length + ' шт.')
        let caseIndexes = []
        this.writeLog('проверка факт.страниц в делах: ' + casesToFindFactPages.length + ' шт.' + JSON.stringify(caseIndexes))
        casesToFindFactPages.forEach((caseObj) => {
            let factPages = this.getCaseFactPages(caseObj)

            if (factPages) {
                caseObj.factPages = factPages

                //обновить счетчик страничек в юзерИнфо
                let allUsersInfo=this.getAllUsersInfo();
                let stitcherId = caseObj.stitcher;
                let stitcher = allUsersInfo.find((el) => el["id"] === stitcherId);
                if(stitcher["pages"]){stitcher["pages"]+=factPages}else{stitcher["pages"]=factPages}
                let scanerId = caseObj.scaner;
                let scaner = allUsersInfo.findIndex((el) => el["id"] === scanerId);
                if(allUsersInfo[scaner]){
                    if(allUsersInfo[scaner]["pages"]!==0){
                        allUsersInfo[scaner]["pages"]+=factPages
                    }else{
                        allUsersInfo[scaner]["pages"]=factPages
                    }
                }
                let jointerId = caseObj.jointer;
                let jointer = allUsersInfo.findIndex((el) => el["id"] === jointerId);
                if(allUsersInfo[jointer]){
                    if(allUsersInfo[jointer]["pages"]!==0){
                        allUsersInfo[jointer]["pages"]+=factPages
                    }else{
                        allUsersInfo[jointer]["pages"]=factPages
                    }
                }

                fs.writeFileSync(pathes.users, JSON.stringify(allUsersInfo), {flag: 'w'});



                this.writeLog('для дела ' + caseObj.act + '_' + caseObj.id + ' найдено ' + factPages + ' страниц на сканАрче')
                this.applyHardChangedCase(caseObj)

            }
            caseIndexes.push(caseObj.act + '_' + caseObj.id)
        })




    },

    writeLog: function (string) {
        let today = moment().format("MMM Do YY");
        let filename = path.join(pathes.logs, '/' + today + '.json')
        let log;
        if (fs.existsSync(filename)) {
            log = JSON.parse(fs.readFileSync(path.join(filename), 'utf8'))
            log.push(moment().format('LTS') + '_____' + string)
        } else {
            log = [moment().format('LTS') + '_____' + string]
        }
        fs.writeFileSync(filename, JSON.stringify(log, null, '\t'), {flag: 'w'});
    },

    saveDB:function(){
        let dirname = moment().format('MMMM Do YYYY, h:mm:ss a');
        dirname = dirname.split(' ').join('');
        dirname = dirname.split(':').join('')
        let source=path.join(pathes.acts);
        let target=path.join(pathes.saveDB, '/'+dirname)

        let copyFileSync=function ( source, target ) {

            let targetFile = target;

            // If target is a directory, a new file with the same name will be created
            if ( fs.existsSync( target ) ) {
                if ( fs.lstatSync( target ).isDirectory() ) {
                    targetFile = path.join( target, path.basename( source ) );
                }
            }

            fs.writeFileSync(targetFile, fs.readFileSync(source));
        }
        let copyFolderRecursiveSync = function( source, target ) {
            let files = [];

            // Check if folder needs to be created or integrated
            let targetFolder = path.join( target, path.basename( source ) );
            if ( !fs.existsSync( targetFolder ) ) {
                fs.mkdirSync( targetFolder );
            }

            // Copy
            if ( fs.lstatSync( source ).isDirectory() ) {
                files = fs.readdirSync( source );
                files.forEach( function ( file ) {
                    let curSource = path.join( source, file );
                    if ( fs.lstatSync( curSource ).isDirectory() ) {
                        copyFolderRecursiveSync( curSource, targetFolder );
                    } else {
                        copyFileSync( curSource, targetFolder );
                    }
                } );
            }
        }
        fs.mkdirSync(target)
        copyFolderRecursiveSync(source, target)
        this.writeLog('сохранение резервной копии БД')
    }
}