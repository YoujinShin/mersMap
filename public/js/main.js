L.mapbox.accessToken = 'pk.eyJ1IjoibWVnZ29uYWd1bCIsImEiOiI1cFpUOE5RIn0.jooCCIM584kmRt2nkSOcHw';

var map = L.map('map', {
	minZoom: 6,
	maxZoom: 19
}).setView([36.9644354,127.7088928], 9);

var baseLayer = L.mapbox.tileLayer('examples.map-20v6611k');
baseLayer.setOpacity(1);
baseLayer.addTo(map);

var hospital = [
 {name: '평택성모병원', num:37, lat: 37.008634, lon: 127.073837, icon: 'p'},
 {name: '아산둔포 서울의원', num: 1, lat:36.928528, lon:  127.038255, icon: 'as'},
 {name: '건양대병원', num: 5, lat: 36.306497, lon: 127.342583, icon: 'g'},
 {name: '삼성서울병원', num: 17, lat: 37.488387, lon: 127.085552, icon: 'ss'},
 {name: '대전 대청병원', num: 3, lat: 36.308539, lon: 127.369981, icon: 'dd'},
 {name: '서울 천호 365열린의원', num: 1, lat: 37.540524, lon: 127.124972, icon: 's_365'}
];

var hospitalLayer = L.mapbox.featureLayer();
var patientLayer = L.mapbox.featureLayer();

queue()
	.defer(d3.csv, "data.csv")
	.await(ready);

// var parseDate = d3.time.format().parse;

// ready
function ready(error, data) {

	hospital.forEach(function(d) { init(d); });
	hospitalLayer.addTo(map);

	initViz(data);
}

var radiusScale = d3.scale.linear()
	.domain([0, 37])
	.range([0, 30000]);

// init
function init(d) {
	var lat = d.lat;
	var lon = d.lon;

	var marker = L.marker([lat, lon], {
		icon: L.mapbox.marker.icon({ 'marker-color': "#ed526f" })
	});

	marker.bindPopup(d.name);
	marker.addTo(hospitalLayer);

	var circleMarker = L.circle([lat, lon], radiusScale(d.num), {
		color: "#526fed",
		opacity: 1,
		fillOpacity: 0.5,
		weight: 2
	});

	circleMarker.bindPopup(d.name + ': ' + d.num + ' 명');
	circleMarker.addTo(patientLayer); 
}







