const serverURL = 'http://room50:3001/';                                 //switch to empty string to build
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
            "newOperation":newOperation,
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
    if (el&&value === '') {
        return el
    } else if (el&&Number(value) === Number(el.act)) {
        return el
    }
}
export const idFilter = function (value, el) {
    if (el&&value === '') {
        return el
    } else if (el&&Number(value) === Number(el.id)) {
        return el
    }
}
export const stitcherFilter=function(value,el){
    if(el&&value===''){
        return el
    }else if(el&&value===el.stitcher){
        return el
    }else if(el&&value==='0'&&el.stitcher&&el.scaner===''&&el.jointer===''){
        return el
    }
}
export const scanerFilter=function(value,el){
    if(el&&value===''){
        return el
    }else if(el&&value===el.scaner){
        return el
    }else if(el&&value==='0'&&el.scaner&&el.jointer===''){
        return el
    }
}
export const jointerFilter=function(value,el){
    if(el&&value===''){
        return el
    }else if(el&&value===el.jointer){
        return el
    }else if(el&&value==='0'&&el.jointer!==''){
        return el
    }
}
export const isDoneFilter=function(value,el){
    if(el&&value===''){
        return el
    }else if(el&&value==='0'&&el.isDone){
        return el
    }else if(el&&value==='-1'&&el.isDone===false){
        return el
    }
}
export const setDateToChoosen=function(choosen_cases, operation, date){
    choosen_cases.forEach((el)=>{
        if(operation==="stitcher"){
            el.stitchDate=date;
        }else if(operation==="scaner"){
            el.scanDate=date;
        }else if(operation==="jointer"){
            el.jointDate=date;
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
export const post_done_cases= async function(userhash,caseList){
    let casesWithNoCirillic = caseList.map((el) => {
        delete el.street;
        delete el.adress;
        return el;
    })
    let response=await fetch(`${serverURL}handOverCases`, {
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
export const reset_userstats = async function(userhash){
    let response=await fetch(`${serverURL}resetUserStats`, {
        method: "GET",
        headers: {
            "userhash": userhash,
        },
    });
    if (response.ok) {
       alert("статистика всех пользователей сброшена")
        return response.json()
    } else {
        alert(response.status + 'не удалось отправить данные на сервер')
    }
}
