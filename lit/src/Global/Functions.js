export const findDate = function (element) {
};

export const  defineColor=function(currentNav){
    if(currentNav==="stitch"){
        return "#44ad50"
    }
    if(currentNav==="scan"){
        return "#bdab46"
    }
    if(currentNav==="joint"){
        return "#e0654c"
    }
}

export const applyFilters=function(el,state){
    if (state.actFilter==''||state.actFilter==el.act){
        if(state.caseFilter==''||state.caseFilter==el.number){
            return el
        }else return false
    }
}


export const requestData= async function(userhash){
    let response = await fetch('http://localhost:3001/1',{
        method: "GET",
        headers:{
            "user":'1',
        }
    })
    if (response.ok){
        let requestedData =  JSON.parse(await response.json())
        console.log(requestedData)
    }else{
        alert(response.status)
    }
}
