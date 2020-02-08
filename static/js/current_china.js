//current China table
d3.json("/china/current").then(function(current){

    var tbody = d3.select(".summary");
    function renderTable(d) {
        //console.log(d);
        d.forEach(element =>{
            //console.log(element);
            var row = tbody.append("tr");
            Object.entries(element).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            })//Object.entries
        })//d.forEach

    }//renderTable

    renderTable(current);

    var button = d3.select("#v-filter-btn");

    tableData = current;

    button.on("click", function(){
        tbody.html("");
        tableData = current;
        var inputDate = d3.select("#vdatetime").property("value");
        var inputProvince = d3.select("#vprovince").property("value");
        var inputCountry = d3.select("#vcountry").property("value");

        if (inputDate!=""){
            var filterData = tableData.filter(tableData => tableData.Date == inputDate);
        };
        if (inputProvince!=""){
            var filterData = tableData.filter(tableData => tableData.Province == inputProvince);
        };
        if (inputCountry!=""){
            var filterData = tableData.filter(tableData => tableData.Country == inputCountry);
        };
        
    
        renderTable(filterData);
    });

    var button2 = d3.select("#v-filter-btn2");
    var button3 = d3.select("#v-filter-btn3");
    var button4 = d3.select("#v-filter-btn4");
    var button5 = d3.select("#v-filter-btn5");
    var button6 = d3.select("#v-filter-btn6");

    sortData = current;

    button2.on("click", function(){
        tbody.html("");
        sortedData = sortData.slice().sort((a, b) => d3.ascending(a.Date, b.Date));
        renderTable(sortedData);
    });
    button3.on("click", function(){
        tbody.html("");
        sortedData = sortData.slice().sort((a, b) => d3.descending(a.Confirmed, b.Confirmed));
        renderTable(sortedData);
    });
    button4.on("click", function(){
        tbody.html("");
        sortedData = sortData.slice().sort((a, b) => d3.descending(a.Death, b.Death));
        renderTable(sortedData);
    });
    button5.on("click", function(){
        tbody.html("");
        sortedData = sortData.slice().sort((a, b) => d3.descending(a.Recovered, b.Recovered));
        renderTable(sortedData);
    });
    button6.on("click", function(){
        tbody.html("");
        sortedData = sortData.slice().sort((a, b) => d3.ascending(a.Province, b.Province));
        renderTable(sortedData);
    });

});

$(document).ready(function(){
    $(".bg").css('background-image', 'url(http://eskipaper.com/images/black-2.jpg)');
 });
