//summary table
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

//China table

d3.json("/map/chinatable").then(function(chinaTable){

    var tbody = d3.select("tbody");
    function renderTable(d) {
        d.forEach(element =>{
            console.log(element);
            var row = tbody.append("tr");
            Object.entries(element).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            })//Object.entries
        })//d.forEach

    }//renderTable
    renderTable(chinaTable);
})

