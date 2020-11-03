
export const request_operator_cases= async function(userhash){
    let response = await fetch('http://localhost:3001/getCases',{
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
    let response = await fetch('http://localhost:3001/postChangedCases',{
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