const serverURL =  'http://room50:3001/';                                 //switch to empty string to build
export const request_operator_cases= async function(userhash){

    let response = await fetch(`${serverURL}getCases`,{
        method: "GET",
        headers:{
            "userhash":userhash,
        }
    })
    if (response.ok){
        let requestedData = await response.json()
        return requestedData
    }else{
        alert(response.status)
    }
}

export const post_case_changes= async function(userhash,changedCases){
    let casesWithNoCirillic = changedCases.map((el)=>{
        delete el.street;
        delete el.adress;
        return el;
    })
    let response = await fetch(`${serverURL}postChangedCases`,{
        method: "GET",
        headers:{
            'Content-Type': 'charset=utf-8',
            "userhash":userhash,
            "changedCases":JSON.stringify(casesWithNoCirillic),
        },
    })
    if (response.ok){
        let requestedData = await response.json()
        return requestedData
    }else{
        alert(response.status + 'не удалось отправить данные на сервер')
        return undefined
    }
}
export const indexFilter=function(value,el){
    if(value===''){return el}
    else if(value===el.index){
        return el
    }
}
export const adressFilter=function(value,el){
    value=value.toLowerCase();
    let fullAdress = (el.street+' '+ el.adress).toLowerCase()
    if(value===''){
        return el
    }else if(fullAdress.indexOf(value)!==-1){
        return el
    }


}