var L = require('leaflet');

L.Icon.Default.imagePath = 'http://leafletjs.com/dist/images';

window.onload = function() {
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'map';
    var map = L.map(div).setView([0, 0], 2);
    L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    var gj = L.geoJson().addTo(map);
};
