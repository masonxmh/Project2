d3.json("/map").then(function(dataChina){
    dataChina.forEach(element => {
        createFeatures(dataChina);
        console.log(element.location);})
        console.log(dataChina);
        // createFeatures(element);})
     //json
})

function createFeatures(features){
    
    function createCircles(data){
        
            L.circle(data.location,{
            color: "red",
            fillColor: "red",
            fillOpacity:0.75,
            radius: circlesSize(data.confirmed)
        });
    }
    
    function circlesSize(confirmed){
        if (confirmed == 0){
            return 0;
        }else if (confirmed >=1000){
            return confirmed*15;
        }else if (confirmed >=100){
            return confirmed*80;
        } else {
            return confirmed*100;
        }
        
    }
    var circles =[];
    chinaGroup= circles.push(createCircles(features));

    createMap(chinaGroup);
}

function createMap(chinaGroup) {

    

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
    "China": chinaLayer
    };
    
    var chinaLayer = L.layerGroup(chinaGroup);
    
    var myMap = L.map("map", {
        center: [30.58, 114.27],
        zoom: 5,
        layers: [dark, chinaLayer]

    });

    L.control
    .layers(baseMaps, overlayMaps,{
        collapsed: false
    }).addTo(myMap);
}
