const excelToJson = require("convert-excel-to-json");
const path = require('path');
const fs = require('fs');



let freshJson = excelToJson({
            sourceFile: path.join('./2020_lost.xlsx')
        })["Лист1"];
		
let readyPathesList = freshJson.map((el,i)=>{
	if(el){
	let pathes={};
	pathes["csvPath"]=el["B"];
	
	let operator = JSON.stringify(el["I"]);
	while(operator.length<2){
		operator = "0" + operator;;
	}
	let caseNumber = JSON.stringify(el["K"])
	while(caseNumber.length<5){
		caseNumber = "0" + caseNumber;
	}
	caseNumber='2020-'+operator+'-'+caseNumber
	pathes["sourceFolder"]= "//NAS/ScanArch/2020_gotovye/"+operator+'/'+caseNumber	
	
	
	
	
	let stringPath = el["B"];
	let splitted = stringPath.split('\\');
	let destination=[];
	destination.push(splitted[0]);
	destination.push(splitted[1]);
	destination.push(splitted[2]);
	splitted = splitted[3].split('-');
	destination.push(splitted[0]);
	let operName=splitted[1];
	let batchNumber="";
	if(splitted[2]=="night"||splitted[2]=="day"){
		operName+="-"+splitted[2]
	}
	destination.push(operName)
	
	if(splitted[2]=="night"||splitted[2]=="day"){
		batchNumber=splitted[3]
	}else{
		batchNumber=splitted[2]
	}
	batchNumber = batchNumber.split('.')[0]
	destination.push(batchNumber)
	
	
	destination = destination.join('/')
	pathes["destination"]=destination
	
	
	
	return pathes
	}
	
})

let writer = function (object, filePath){
    if (fs.existsSync(filePath)){fs.unlinkSync(filePath);}
    fs.writeFileSync(path.join(filePath), JSON.stringify(object, null, '\t'), {flag: 'w'});
	console.log("file "+ __dirname+"/"+filePath +" overWriten" )
}





let csvText = "";
readyPathesList.forEach((el)=>{
	csvText+=el.sourceFolder+";"+el.destination+";______"
	})
	
	console.log(csvText)
writer(csvText,'./2020_lostTickets')

		
		