const serverURL = 'http://localhost:3001/';                      //'http://localhost:3001/'          //switch to empty string to build
const moment = require("moment");
export const request_operator_cases = async function (userhash) {

    let response = await fetch(`${serverURL}getCases`, {
        method: "GET",
        headers: {
            "userhash": userhash,
        }
    })
    if (response.ok) {
        let requestedData = await response.json()
        return requestedData
    } else {
        alert(response.status)
    }
}

export const post_case_changes = async function (userhash, changedCases) {
    let casesWithNoCirillic = changedCases.map((el) => {
        delete el.street;
        delete el.adress;
        return el;
    })
    let response = await fetch(`${serverURL}postChangedCases`, {
        method: "GET",
        headers: {
            'Content-Type': 'charset=utf-8',
            "userhash": userhash,
            "changedCases": JSON.stringify(casesWithNoCirillic),
        },
    })
    if (response.ok) {
        let requestedData = await response.json()
        return requestedData
    } else {
        alert(response.status + 'не удалось отправить данные на сервер')
        return undefined
    }
}

export const change_admin_operation = async function (userhash, newOperation) {
    let response = await fetch(`${serverURL}changeAdminOperation`, {
        method: "GET",
        headers: {
            'Content-Type': 'charset=utf-8',
            "userhash": userhash,
            "newOperation": newOperation,
        },
    })
    if (response.ok) {
        let requestedData = await response.json()
        return requestedData
    } else {
        alert(response.status + 'не удалось отправить данные на сервер')
        return undefined
    }
}


export const indexFilter = function (value, el) {
    if (el && value === '') {
        return el
    } else if (el && value === el.index) {
        return el
    }
}
export const adressFilter = function (value, el) {
    if (el) {
        value = value.toLowerCase();
        let fullAdress = (el.street + ' ' + el.adress).toLowerCase()
        if (value === '') {
            return el
        } else if (fullAdress.indexOf(value) !== -1) {
            return el
        }
    }
}
export const actFilter = function (value, el) {
    if (el && value === '') {
        return el
    } else if (el && Number(value) === Number(el.act)) {
        return el
    }
}
export const idFilter = function (value, el) {
    if (el && value === '') {
        return el
    } else if (el && Number(value) === Number(el.id)) {
        return el
    }
}
export const stitcherFilter = function (value, el) {
    if (el && value === '') {
        return el
    } else if (el && value === el.stitcher) {
        return el
    } else if (el && value === '0' && el.stitcher && el.scaner === '' && el.jointer === '') {
        return el
    } else if (el && value === '-1' && el.stitcher === '') {
        return el
    }
}
export const stitchDateFilter = function (value,el){
    if (el && value === '') {
        return el
    } else if (el && el.stitchDate.indexOf(value)!==-1) {
        return el
    }
}
export const scanerFilter = function (value, el) {
    if (el && value === '') {
        return el
    } else if (el && value === el.scaner) {
        return el
    } else if (el && value === '0' && el.scaner && el.jointer === '') {
        return el
    } else if (el && value === '-1' && el.scaner === '') {
        return el
    }
}
export const scanerDateStartFilter = function (value, el) {
    if (el && value === '') {
        return el
    } else if (el && el.scanDateStart.indexOf(value)!==-1) {
        return el
    }
}
export const scanerDateFinishFilter = function (value, el) {
    if (el && value === '') {
        return el
    } else if (el && el.scanDateFinish.indexOf(value)!==-1) {
        return el
    }
}
export const jointerFilter = function (value, el) {
    if (el && value === '') {
        return el
    } else if (el && value === el.jointer) {
        return el
    } else if (el && value === '0' && el.jointer !== ''&&el.isDone===false) {
        return el
    } else if (el && value === '-1' && el.jointer === '') {
        return el
    }
}
export const jointDateFilter = function (value, el) {
    if (el && value === '') {
        return el
    } else if (el && el.jointDate.indexOf(value)!==-1) {
        return el
    }
}
export const isDoneFilter = function (value, el) {
    if (el && value === '') {
        return el
    } else if (el && value === '0' && el.isDone) {
        return el
    } else if (el && value === '-1' && el.isDone === false) {
        return el
    }  else if (el && el.isDoneDate.indexOf(value)!==-1) {
        return el
    }
}

export const applyFilters = function (filters, filtredElement) {
    filtredElement = indexFilter(filters.index, filtredElement);
    filtredElement = adressFilter(filters.adress, filtredElement);
    filtredElement = idFilter(filters.id, filtredElement);
    filtredElement = actFilter(filters.act, filtredElement);
    filtredElement = stitcherFilter(filters.stitcher, filtredElement);
    filtredElement = stitchDateFilter(filters.stitchDate,filtredElement)
    filtredElement = scanerFilter(filters.scaner, filtredElement);
    filtredElement = scanerDateStartFilter(filters.scanerDateStart,filtredElement)
    filtredElement = scanerDateFinishFilter(filters.scanerDateFinish,filtredElement)
    filtredElement = jointerFilter(filters.jointer, filtredElement);
    filtredElement = jointDateFilter(filters.jointDate,filtredElement)
    filtredElement = isDoneFilter(filters.isDone, filtredElement);
    return filtredElement
}
export const setDateToChoosen = function (choosen_cases, operation, date) {
    choosen_cases.forEach((el) => {
        if (operation === "stitcher") {
            el.stitchDate = date;
        } else if (operation === "scaner") {
            el.scanDate = date;
        } else if (operation === "jointer") {
            el.jointDate = date;
        }
    })
}
export const request_casesForSearch = async function (userhash) {

    let response = await fetch(`${serverURL}casesForSearch`, {
        method: "GET",
        headers: {
            "userhash": userhash,
        }
    })
    if (response.ok) {
        let requestedData = await response.json()
        return requestedData
    } else {
        alert(response.status)
    }
}
export const post_done_cases = async function (userhash, caseList) {
    let casesWithNoCirillic = caseList.map((el) => {
        delete el.street;
        delete el.adress;
        return el;
    })
    let response = await fetch(`${serverURL}handOverCases`, {
        method: "GET",
        headers: {
            "userhash": userhash,
            "changedCases": JSON.stringify(casesWithNoCirillic),
        },
    });
    if (response.ok) {
        return await response.json()
    } else {
        alert(response.status + 'не удалось отправить данные на сервер')
        return undefined
    }
}
export const reset_userstats = async function (userhash) {
    let response = await fetch(`${serverURL}resetUserStats`, {
        method: "GET",
        headers: {
            "userhash": userhash,
        },
    });
    if (response.ok) {
        return response.json()
    } else {
        alert(response.status + 'не удалось отправить данные на сервер')
    }
}

export const request_projectStats = async function (userhash) {

    let response = await fetch(`${serverURL}projectStats`, {
        method: "GET",
        headers: {
            "userhash": userhash,
        }
    })
    if (response.ok) {
        let requestedData = await response.json()
        return requestedData
    } else {
        alert(response.status)
    }
}
export const request_userStats = async function (userhash) {

    let response = await fetch(`${serverURL}getUsersStats`, {
        method: "GET",
        headers: {
            "userhash": userhash,
        }
    })
    if (response.ok) {
        let requestedData = await response.json()
        return requestedData
    } else {
        alert(response.status)
    }
}
export const request_userStatsByActs = async function(userhash){
    let response = await fetch(`${serverURL}getUsersStatsByActs`, {
        method: "GET",
        headers: {
            "userhash": userhash,
            "statsOperation":"stitcher"
        }
    })
    if (response.ok) {
        let requestedData = await response.json()
        return requestedData
    } else {
        alert(response.status)
    }
}
export const getMomentFromDateString = function (dateString) {
    let splitDate = dateString.split(' ')
    let stringDay = splitDate[1];
    let day = parseInt(stringDay.replace(/[^\d]/g, ''))
    let month = splitDate[0]
    let year = splitDate[2]
    let finishDate = moment().date(day)
    finishDate.month(month)
    finishDate.year(Number(20 + '' + year));
    finishDate.startOf("day");
    return finishDate
}
export const post_new_user = function (userhash, newUser) {
    if (newUser.id !== '' && newUser.userhash !== '' && newUser.name !== '') {
        let xhr = new XMLHttpRequest(); // 2. Настраиваем его: GET-запрос по URL /article/.../load

        xhr.open('POST', `${serverURL}createNewUser`, true);
        xhr.setRequestHeader("userhash", userhash);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(newUser))
        xhr.onload = function() {
            alert(`ОТВЕТ:  ${xhr.response}`);
        };
    } else {
        alert("заполните все необходимые поля")
    }
}
export const deleteUser=  function(userhash,userToDelete){
    if (userToDelete!== '' ) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${serverURL}deleteUser`, true);
        xhr.setRequestHeader("userhash", userhash);
        xhr.setRequestHeader("userToDelete",userToDelete);
        xhr.send();
        xhr.onload = function() {
            alert(`ОТВЕТ:  ${xhr.response}`);
        };
    } else {
        alert("заполните все необходимые поля")
    }
}
export const getCaseFromServer=async function(userhash,caseToChange){

    let response = await fetch(`${serverURL}getCaseToHardChange`, {
        method: "GET",
        headers: {
            "userhash": userhash,
            "caseToChange":caseToChange,
        }
    })
    if (response.ok) {
        let requestedData = await response.json()
        return requestedData
    } else {
        alert(response.status)
    }
}

export const postHardChange = function (userhash, hardChangeCase) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverURL}postHardChangeCase`, true);
    xhr.setRequestHeader("userhash", userhash);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(hardChangeCase))
    xhr.onload = function () {
        alert(`ОТВЕТ:  ${xhr.response}`);
    };
}
export const getOperationStats=async function(userhash,statsOperation){
    let response = await fetch(`${serverURL}getUsersStats2`, {
        method: "GET",
        headers: {
            "userhash": userhash,
            "statsOperation":statsOperation,
        }
    })
    if (response.ok) {
        let requestedData = await response.json()
        return requestedData
    } else {
        alert(response.status)
    }
}

export const getCurrentMonth = function (dateStats,neededMonth){
    let m_neededMonth = moment().month(Number(neededMonth)-1);

    let currentMonthDates = {};
    for (let day in dateStats) {
        let date = getMomentFromDateString(day)
        if(m_neededMonth.isSame(date, 'month')){
            currentMonthDates[day]=dateStats[day]
        }
    }
    return currentMonthDates
}
