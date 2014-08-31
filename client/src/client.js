var L = require('leaflet');

L.Icon.Default.imagePath = 'http://leafletjs.com/dist/images';

window.onload = function() {
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'map';

    var DC_COORDS = [38.914268, -77.021098];
    var map = L.map(div).setView(DC_COORDS, 13);

    L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Initialize the layer with no features; the request below will be used to populate it.
    var layer = L.geoJson(null, {
        onEachFeature: onEachFeature
    }).addTo(map);

    // The request package added 3/4 MB to my client.js, so it's back to using this ugly thing.
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/features', true);
    xhr.onload = function(e) {
        if (xhr.readyState == 4) { // 4 indicates complete
            if (xhr.status == 200 && xhr.responseText) {
                layer.addData(JSON.parse(xhr.responseText));
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function(e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
};

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
    }
}
