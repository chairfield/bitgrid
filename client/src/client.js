var L = require('leaflet');
var request = require('request');

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

    request('http://bitgrid.jit.su/api/features', function(error, res, body) {
        if (!error && res.statusCode == 200) {
            layer.addData(JSON.parse(body));
        }
    });
};

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
    }
}
