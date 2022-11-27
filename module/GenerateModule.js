const type = ["SPIRAL", "ELLIPTICAL", "PECULIAR", "IRREGULAR"]
exports.galaxyName = ()=>{
    let univerName = "M3";     //Universe name
    let orbitName = "OR";      //Orbit Name 
    let typeName = "S14";      // S-type, number of turn
    let radiusN = "UN00";      //radius
    let nickName = "MILKY WAY";
    let string = nickName.split(" ");
    let finalName = string.join("-")
    // console.log(finalName);
    let name = univerName +"-"+orbitName+"-"+typeName+"-"+radiusN+"-"+finalName;
    return name
}