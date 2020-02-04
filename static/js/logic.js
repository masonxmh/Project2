d3.json("/map").then(function(dataChina){
    var circles =[];
    dataChina.forEach(element => {
        // createCircles(element);
        circles.push(L.circle(element.location,{
            color: "red",
            fillColor: "red",
            fillOpacity:0.75,
            radius: circlesSize(element.confirmed)
            })
        );
    })
    var chinaLayer = L.layerGroup(circles);
    createMap(chinaLayer);


    
        
    
    
    function circlesSize(confirmed){
        if (confirmed == 0){
            return 0;
        }else if (confirmed >=1000){
            return confirmed*15;
        }else if (confirmed >=100){
            return confirmed*150;
        } else {
            return confirmed*100;
        }
        
    }


    function createMap(chinaLayer) {

    
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
        
        
        
        var myMap = L.map("map", {
            center: [30.58, 114.27],
            zoom: 10,
            layers: [dark, chinaLayer]
            });
    
        L.control
        .layers(baseMaps, overlayMaps,{
            collapsed: false
        }).addTo(myMap);

    }

});//json



