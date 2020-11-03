const fs = require('fs');
const path = require('path');
const excelToJson = require("convert-excel-to-json");

module.exports = {

    createActObject: function (el) {                                                                        //парсит новый акт в excel , сохраняет его в JSON
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

                    elem.stitchDate = ''
                    elem.stitcher = ''
                    elem.stitcherhash=''

                    elem.scanDate = ''
                    elem.scaner = ''
                    elem.scanerhash=''
                    elem.pages = ''
                    elem.scanNumber = ''

                    elem.jointDate = ''
                    elem.jointer = ''
                    elem.jointerhash=''

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
        let promisificate = function () {                                                                       //отслеживает добавление нового акта и возвращает его название
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
        return promisificate().then((resolve) => {
            let excels = resolve.excels;
            let excelNames = excels.map((el) => el.split('.')[0]);
            let acts = resolve.acts;
            let actNames = acts.map((el) => el.split('.')[0]);

            const diff = function (a1, a2) {
                return a1.filter(i => !a2.includes(i))
                    .concat(a2.filter(i => !a1.includes(i)))
            }
            return diff(excelNames, actNames)
        })
    },
    getAllUsersInfo:function(){                                                          //прочитать из файла все данные о всех пользователях
        let allUsersInfo = JSON.parse(fs.readFileSync(path.join(__dirname + '/users.json'), 'utf8'))
        return allUsersInfo
    },


    getUserInfo: function (userhash) {                                                    // вся инфа о пользователе  из users.json
        let userInfo = JSON.parse(fs.readFileSync(path.join(__dirname + '/users.json'), 'utf8'))
            .filter((el) => el.userhash === userhash)
        console.log(userInfo)
        return userInfo[0];

    },



    getCasesForUser: function (userInfo) {                                                                 //отобрать дела, предназначенные пользователю.
        if (userInfo) {
            let operation = userInfo["operation"];
            let fileNames = fs.readdirSync('./acts');
            let casesForUser = [];
            fileNames.forEach((el) => {
                let act = JSON.parse(fs.readFileSync(path.join(__dirname + '/acts/' + el), 'utf8'))
                act.forEach((el) => {
                    if (operation === "stitcher" && el.stitcher === '') {
                        casesForUser.push(el);
                    }else if(operation==="scaner" && el.stitcher &&el.scaner===''){
                        casesForUser.push(el);
                    }else if(operation==="jointer" && el.stitcher&& el.scaner  && el.jointer===''){
                        casesForUser.push(el);
                    }
                })
            })
            console.log("operator "+userInfo["id"]+" got caseList   (getCasesForUser)")
            return casesForUser
        } else{
            console.log("Error: getCasesForUser(server/Functions.js) -- userInfo not match");
            return ['Error: getCasesForUser(server/Functions.js) -- userInfo not match']
        }
    },


    applyChangesToCases: function(userhash,changedCases){
        let userInfo = this.getUserInfo(userhash)
        let allUsersInfo = this.getAllUsersInfo()
        let fileNames = fs.readdirSync('./acts');
        fileNames.forEach((actNumber) => {
            let act = JSON.parse(fs.readFileSync(path.join(__dirname + '/acts/' + actNumber), 'utf8'))
            act.forEach((fileCase) => {                                                                     //перебираем каждый элемент из каждого акта
                changedCases.forEach((changedCase)=>{                                                       //сравниваем с каждым элементом измененного списка
                    if(fileCase.index===changedCase.index){                                                 //<<===получили нужное дело
                        if(userInfo["operation"]==="stitcher"){                                             //вносим изменения, если юзер расшивка
                            fileCase.stitcher=userInfo["id"];
                            fileCase.stitcherhash=userInfo["userhash"];
                            userInfo["acts"]++;

                        }else if(userInfo["operation"]==="scaner"){                                       // вносим изменения, если юзер сканировщик
                            fileCase.scaner=userInfo["id"];
                            fileCase.scanerhash=userInfo["userhash"];
                            fileCase.pages=changedCase.pages;
                            fileCase.scanNumber=changedCase.scanNumber;
                            userInfo["acts"]++;

                            let stitcher=allUsersInfo.find((el)=>el["operation"]==="stitcher");             //добавляем данные к другим пользователям (кол-во страниц)
                            stitcher["pages"]=stitcher["pages"]+Number(changedCase.pages);

                        }else if(userInfo["operation"]==="jointer"){                                        //вносим изменения, если юзер сшивка
                            fileCase.jointer=userInfo["id"];
                            fileCase.jointerhash=userInfo["userhash"];
                            userInfo["acts"]++;

                        }


                    }
                })
                fs.unlinkSync(`acts/${actNumber}`); //удалить старый экземпляр акта
                fs.writeFileSync(`acts/${actNumber}`, JSON.stringify(act));//сохранить акт здеся
            })
        })

    }


}