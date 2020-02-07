d3.json("/map/china").then(function(dataChina){
    d3.json("/map/world").then(function(dataWorld){
    var circles =[];
    var circlesWorld =[];
    console.log(dataChina);
    dataChina.forEach(element => {
        // createCircles(element);
        circles.push(L.circle(element.location,{
            color: "red",
            fillColor: "red",
            fillOpacity:0.75,
            radius: circlesSize(element.confirmed)
            }).bindPopup("<h5>"+ "Country: " +element.country + "</h5><hr><h5>"
                         + "Province: " + element.Provinces + "</h5><hr><h5>"+
                          "Confirmed: "+element.confirmed+"</h5>")
        );
    })// end of dataChina loop

    dataWorld.forEach(element => {
        
        // createCircles(element);
        circlesWorld.push(L.circle(element.location,{
            color: "red",
            fillColor: "red",
            fillOpacity:0.75,
            radius: circlesSize(element.confirmed)
            }).bindPopup("<h5>"+ "Country: " +element.country + "</h5><hr><h5>"
                          +"<hr><h5>"+
                          "Confirmed: "+element.confirmed+"</h5>")
        );
    })// end of dataChina loop
    var chinaLayer = L.layerGroup(circles);
    var worldLayer = L.layerGroup(circlesWorld);
    createMap(chinaLayer,worldLayer);
    console.log(dataWorld);

    ////////////////////////////////side menue////////////////////////////////
  
    });//jsonWorld
});//jsonChina
    
        
    
    
function circlesSize(confirmed){
    if (confirmed == 0){
        return 0;
    }else if (confirmed >=1000){
        return confirmed*15;
    }else if (confirmed >=100){
        return confirmed*150;
    } else {
        return confirmed*300;
    }
    
}


function createMap(chinaLayer,worldLayer) {


    // Define variables for our tile layers
    var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
    });

    var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
    });

    // Only one base layer can be shown at a time
    var baseMaps = {
    "Dark": dark,
    "Light": light
    };

    // Overlays that may be toggled on or off
    var overlayMaps = {
    "China": chinaLayer,
    "World": worldLayer
    };
    
    
    
    var myMap = L.map("map", {
        center: [30.58, 114.27],
        zoom: 4,
        layers: [dark, chinaLayer, worldLayer]
        });

        myMap.on("click", e =>  {
            console.log(e);
        })
    

    L.control
    .layers(baseMaps, overlayMaps,{
        collapsed: true
    }).addTo(myMap);

}





