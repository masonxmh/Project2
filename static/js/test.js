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
//China table

d3.json("/map/worldtable").then(function(worldTable){

    var tbody = d3.select("tbody");
    function renderTable(d) {
        // console.log(d);
        d.forEach(element =>{
            // console.log(element);
            var row = tbody.append("tr");
            Object.entries(element).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            })//Object.entries
        })//d.forEach

    }//renderTable
    renderTable(worldTable);
})

