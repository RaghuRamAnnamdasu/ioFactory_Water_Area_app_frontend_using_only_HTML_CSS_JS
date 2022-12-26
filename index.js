// var inputArray = [0,4,0,0,0,6,0,6,4,0];
var dummyValue = 100;
var inputArray = [];
var heightArray = [];
var waterArea = 0;

function handleInputChange() {
    var input = document.getElementById("input").value;
    inputArray = input.split(" ").map((x)=>+x);
    console.log("on blur",inputArray);
}




function handleClick() {

    let svgElement = document.getElementsByTagName("svg")[0];
    let output = document.getElementsByClassName("output")[0];
    if(svgElement && svgElement.innerHTML) {
        let visualizationEnclosure = document.getElementsByClassName("visualizationEnclosure")[0];
        svgElement.innerHTML = "";
    }
    for(let i=0;i<inputArray.length;i++){
        let leftPeakValue = inputArray[i];
        let rightPeakValue = inputArray[i];
        let peakDifference = 0;
        for(let j=0;j<i;j++){
            leftPeakValue = Math.max(leftPeakValue,inputArray[j]);
            // console.log("inside left loop.....",leftPeakValue)
        }
        for(let k=i+1;k<inputArray.length;k++){
            rightPeakValue = Math.max(rightPeakValue,inputArray[k]);
        }
        peakDifference = Math.min(leftPeakValue,rightPeakValue) - inputArray[i]
        waterArea = waterArea + peakDifference;
        // console.log("In each iteration....",i,leftPeakValue,rightPeakValue,waterArea);
        let dataObject = {
            wallHeight : inputArray[i]*30,
            waterHeight : peakDifference*30
        };
        heightArray.push(dataObject);
    }
    
    console.log("Water area trapped = ",waterArea);
    console.log("data Array = ",heightArray);

    let html = "";
    let width = 0;
    let height = 0;
    let dummyWidth = 0;
    let dummyHeight = 0;
    heightArray.map((value,index)=>{
        wallHeight = value.wallHeight;
        waterHeight = value.waterHeight;
        let html1 = `<rect class = "wall" x = "${width}" y = "${350-(wallHeight)}" width = "50" height = "${wallHeight}" style="fill:yellow;" />`;
        let html2 = `<rect class = "water" x = "${width}" y = "${350-(wallHeight+waterHeight)}" width = "50" height = "${waterHeight}" style="fill:skyblue;"/>`;
        html = html + html1 + html2;
        width = width + 50;
    });

    while(dummyValue>1){
        let html3 = `<rect class = "xGridLines" x = "0" y = "${350-dummyHeight}" width = "10000" height = "1" />`
        let html4 = `<rect class = "yGridLines" x = "${dummyWidth}" y = "0" width = "1" height = "10000" />`
        html = html + html3 + html4;
        dummyHeight = dummyHeight + 30;
        dummyWidth = dummyWidth + 50;
        dummyValue = dummyValue -1 ;
    }

    console.log(html);

    output.innerHTML = `The area of water trapped inside blocks is <span>${waterArea} units</span>.`
    svgElement.innerHTML = html;
    document.getElementById("input").value = "";
    inputArray = [];
    heightArray = [];
    waterArea=0;
    dummyValue=100;
}




// console.log("class",document.getElementsByTagName("svg"));