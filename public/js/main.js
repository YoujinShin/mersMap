L.mapbox.accessToken = 'pk.eyJ1IjoibWVnZ29uYWd1bCIsImEiOiI1cFpUOE5RIn0.jooCCIM584kmRt2nkSOcHw';

var map = L.map('map', {
	minZoom: 6,
	maxZoom: 19
}).setView([36.9644354,127.7088928+3.0], 7);

// MapID: https://www.mapbox.com/developers/api/maps/
// grey: examples.map-20v6611k
// mapbox.light, mapbox.dark

var baseLayer = L.mapbox.tileLayer('examples.map-20v6611k');
baseLayer.setOpacity(1);
baseLayer.addTo(map);

var hospital = [
	{name: '평택성모병원', num:0, lat: 37.008634, lon: 127.073837, icon: 'pyungtack', y: 0, death: 0},
	{name: '아산둔포 서울의원', num: 0, lat:36.928528, lon:  127.038255, icon: 'asan', y: 0, death: 0},
	{name: '건양대병원', num: 0, lat: 36.306497, lon: 127.342583, icon: 'gunyang', y: 0, death: 0},
	{name: '삼성서울병원', num: 0, lat: 37.488387, lon: 127.085552, icon: 'samsung', y: 0, death: 0},
	{name: '대전 대청병원', num: 0, lat: 36.308539, lon: 127.369981, icon: 'daejeon', y: 0, death: 0},
	{name: '서울 천호 365열린의원', num: 0, lat: 37.540524, lon: 127.124972, icon: 'seoul365', y: 0, death: 0},
	{name: '여의도성모병원', num: 0, lat: 37.518443, lon: 126.936635, icon: 'yeouido', y: 0, death: 0},
	{name: '서울아산병원', num: 0, lat: 37.527126, lon: 127.10836, icon: 'seoulasan', y: 0, death: 0},
	{name: '한림대 동탄 성심병원', num: 0, lat: 37.216878, lon: 127.080121, icon: 'hanlym', y: 0, death: 0},
	{name: '송태의 내과', num: 0, lat: 37.503721, lon: 127.089854, icon: 'songtaeui', y: 0, death: 0},
	{name: '건국대병원', num: 0, lat: 37.540958, lon: 127.079305, icon: 'gunguk', y: 0, death: 0},
	{name: '평택굿모닝병원', num: 0, lat: 36.990843, lon: 127.12025, icon: 'goodmorning', y: 0, death: 0},
	{name: '강동 경희대학교의대병원', num: 0, lat: 37.553714, lon: 127.157663, icon: 'kangdong', y: 0, death: 0}
];

var hospitalLayer = L.mapbox.featureLayer();
var patientLayer = L.mapbox.featureLayer();

// var parseDate = d3.time.format("%m/%e/%Y").parse; // 6/7/2015
var parseDate = d3.time.format("%e-%b").parse; // 7-Jun


queue()
	.defer(d3.csv, "/data/061615.csv")
	.await(ready);


// ready
function ready(error, data) {

	getNumber(data);
	// console.log(hospital);

	data.forEach(function(d) { 
		d.date = parseDate(d.date);
	});

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

	marker.bindPopup(d.name + ': ' + '확진자 (' + d.num + ')명' + ', 사망 (' + d.death + ')명');
	marker.addTo(hospitalLayer);

	// var circleMarker = L.circle([lat, lon], radiusScale(d.num), {
	// 	color: "#526fed",
	// 	opacity: 1,
	// 	fillOpacity: 0.5,
	// 	weight: 2
	// });

	// circleMarker.bindPopup(d.name + ': ' + d.num + ' 명');
	// circleMarker.addTo(patientLayer); 
}


var currentDate = '20-May';
var cnt = 0;

// get number in each hospital
function getNumber(data) {

	for(var i = 0; i < data.length; i++) {
		var currentHospital = data[i].hospital;
		var currentCondition = data[i].condition;

		hospital.forEach(function(e) {
			if(currentHospital == e.icon) {
				e.num = e.num + 1;

				if(currentCondition == 'death') {
					e.death = e.death + 1;
				}
			}

		});

		if(currentDate == data[i].date) {
			cnt = cnt + 1;
			data[i].y = cnt;
		} else {
			currentDate = data[i].date;
			cnt = 1;
			data[i].y = 1;
		}

	}
}





