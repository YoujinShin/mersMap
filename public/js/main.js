L.mapbox.accessToken = 'pk.eyJ1IjoibWVnZ29uYWd1bCIsImEiOiI1cFpUOE5RIn0.jooCCIM584kmRt2nkSOcHw';

var map = L.map('map', {
	minZoom: 6,
	maxZoom: 19
}).setView([35.8615124,127.096405], 7);

// color: examples.map-i86nkdio
// grey: examples.map-20v6611k
// satellite: examples.map-2k9d7u0c
// white: examples.map-8ced9urs'

var baseLayer = L.mapbox.tileLayer('examples.map-20v6611k');
baseLayer.setOpacity(1);
baseLayer.addTo(map);

map.fitBounds(
	[ 
		[35.8615124 - 3, 127.096405 - 3], 
		[35.8615124 + 3, 127.096405 + 3] 
		// [southWest_lat, southWest_lng], [northEast_lat, northEast_lng] 
	], { paddingTopLeft: [-500, 50] } // [x, y]
);


var hospitalLayer = L.mapbox.featureLayer();
var patientLayer = L.mapbox.featureLayer();