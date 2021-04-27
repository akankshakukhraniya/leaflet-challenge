// LEVEL I
// USGS GeoJSON = http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

Earthquake_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create Map and object
function earthQuakeMap() {

    var myMap= L.map("map", {
        center: [0, 0],
        zoom: 3,
        worldCopyJump: true
    });

    // Adding tile layer to the map
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 10,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    // Creating geojson layer
    d3.json(Earthquake_url, function (data) {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, markerStyle(feature));
            },

        // Pop-up for each feature
        onEachFeature: function (feature, layer) {
            layer.bindPopup("<h1>Magnitude: " + feature.properties.mag+ "</h1> <hr> <h2>" + feature.properties.place + "</h2>");
            }

        }).addTo(myMap);
    
    mapLegend(myMap);

    });        
    
};

// Create function for legend to display information about our map
function mapLegend(map) {

    colors = ["brown", "purple", "blue", "green", "orange", "red"];

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend'),
                    categories = ['<1', '1 to <2', '2 to <3', '3 to <4', '4 to <5', '>5'],
                    labels = [];

        div.innerHTML += '<strong> Magnitude </strong> <br>'

        // Loop through intensity to generate label 
        for (var i = 0; i < categories.length; i++) {
            div.innerHTML +=
               '<i style="background:' + colors[i] + '"></i>' +
               categories[i] + '<br>';
        };
        return div;
    };
    legend.addTo(map);  
};

//  Function for Styling markers
function markerStyle(feature) {
    return{
        fillColor: markerColor(feature.properties.mag),
        ratius: 3*feature.properties.mag,
        weight: 2,
        Opacity: 1,
        color: markerColor(feature.properties.mag),
        fillOpacity: 0.8
    };
};

// Create function for determining the color of marker based on magnitude
function markerColor(magnitude) {
    if (magnitude<1) {
        return "brown"}
    else if (magnitude<2) {
        return "purple"}
    else if (magnitude<3) {
        return "blue"}
    else if (magnitude < 4) {
        return "green"}
    else if (magnitude < 5) {
        return "orange"}
    else if (magnitude >= 5) {
        return "red"}
    else {
        return "black"}    
    };

earthQuakeMap();
