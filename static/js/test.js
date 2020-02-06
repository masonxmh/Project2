//summary table
d3.json("/test").then(function(tdata){
    // console.log(testData);
    console.log(tdata);
    var deck = d3.select(".card-group").selectAll(".card-body");
    deck.data(tdata[0])
            .append("h4")
            .classed("card-title",true)
            .text(x=>x)
    
})


//World list
d3.json("/map/worldlist").then(function(dataWorld){
    
    dataWorld.forEach( dataW=> {
        var listing =  d3.select('#list-group-world')
            .append('a')
            .classed("list-group-item list-group-item-action flex-column align-items-start", true)
            .append('div')
            .classed("d-flex w-100 justify-content-left",true);

        var link=listing.append("i").classed(`${dataW.countryShort.toLowerCase()} flag`, true).append("h4").classed("mb1",true);

        link.append("span").style("font-size", "14px").text(dataW.country+" ")
        link.append("span").style("color", "red").text(dataW.confirmed).style("text-align", "right")

        var link2 
        link.append("br")
        link.append("span").style("font-size", "14px").style("color", "orange").text("Suspected "+dataW.suspected+", ")
        link.append("span").style("font-size", "14px").style("color", "grey").text("Dead, "+dataW.dead+", ")
        link.append("span").style("font-size", "14px").style("color", "green").text("Cured "+dataW.cured)
    }) 




})// worldlist json





// d3.json("/map/worldtable").then(function(worldTable){

//     var tbody = d3.select("tbody");
//     function renderTable(d) {
//         // console.log(d);
//         d.forEach(element =>{
//             // console.log(element);
//             var row = tbody.append("tr");
//             Object.entries(element).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//             })//Object.entries
//         })//d.forEach

//     }//renderTable
//     renderTable(worldTable);
// })
