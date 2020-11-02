
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

    console.log(changedCases)
    let response = await fetch('http://localhost:3001/postChangedCases',{
        method: "GET",

        headers:{
            'Content-Type': 'charset=utf-8',
            "userhash":userhash,
            "changedCases":{changedCases},
        },
    })
    if (response.ok){

        return
    }else{
        alert(response.status)
    }
}