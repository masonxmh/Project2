d3.json("/test").then(function(testData){
    // console.log(testData);

    var recordData = [];
    testData.forEach(i => recordData.push(i[1]));
    console.log(`summary table ${recordData}`)

    var deck = d3.select(".card-group").selectAll(".card-body");
    
    deck
        .data(recordData)
        .append("h4")
        .classed("card-title",true)
        .text(x => x)
    })