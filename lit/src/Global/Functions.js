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
export const getData= async function(){
    let response = await fetch('http://localhost:3001/',{
        method: "POST",
            headers: {
            "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/plain"
        }});
        if (response.ok) {
            let json = await response.json();
            return json;
        } else {

            alert("Ошибка HTTP: " + response.status);
            return []
        }
}
