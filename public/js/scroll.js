window.drawDone = false;

// VIZ LEFT
widthL = $('#viz_left').width();
heightL = $('#viz_left').height();

svgL = d3.select('#viz_left').append('svg')
	.attr('width', widthL).attr('height', heightL);

// VIZ RIGHT
$('#viz_right').css('height', window.innerHeight);

widthR = $('#viz_right').width();
heightR = $('#viz_right').height();

svgR = d3.select('#viz_right').append('svg')
    .attr('width', widthR).attr('height', heightR);

// 
tooltip = d3.select("body")
	.append("div").attr("id", "tooltip");

parseDate = d3.time.format("%e-%b").parse;

ages = [ 0, 20, 40, 60, 80 ];

hospital = [
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
    {name: '강동 경희대학교의대병원', num: 0, lat: 37.553714, lon: 127.157663, icon: 'kangdong', y: 0, death: 0},
    {name: '아산충무병원', num: 0, lat: 36.780079, lon: 127.020105, icon: 'asancm', y: 0, death: 0}
];

// SCALES
var topMax = $('body').height() - window.innerHeight;

// date to left bar
var yScaleL = d3.time.scale() 
	.domain([ parseDate('18-May'), parseDate('23-Jun') ])// .domain([ parseDate('20-May'), parseDate('21-Jun') ])
	// .range([0, topMax]);
    .range([0, window.innerHeight]);

// scrollTop to left bar
var yScaleL2 = d3.time.scale()
    .domain([0, topMax])
    .range([0, window.innerHeight ]);

var progressBar = svgL.append('rect')
	.attr('x', 0).attr('y', 0)
	.attr('width', 6).attr('height', 0)
	.attr('fill', 'rgba(255,255,255,1)')
	.attr('stroke-width', 0);

// LOAD DATA
queue()
	.defer(d3.csv, "/data/061621.csv")
	.await(ready);

function ready(error, data) {

    getNumber(data);

	data.forEach(function(d) { 
        d.date = parseDate(d.date);
    });

    initViz(data);

	// points = svgL.selectAll("rect")
	// 		.data(data)
	// 	.enter().append("rect")
	// 	.attr('x', function(d) { return 0; })
	// 	.attr('y', function(d, i) { return yScaleL(d.date) - 0.5; })
	// 	.attr("width", function(d) { return 18; })
	// 	.attr("height", 1)
	// 	.style("fill", 'rgba(255,255,255,1)' )
	// 	.attr('stroke', 'rgba(0,0,0,0)')
	// 	.attr('stroke-width', 0)
	// 	.on("mouseover", function(d,i) {

	// 		getName(d.hospital);

	// 		tooltip.text(d.age + '세, ' +  hospitalName);
	// 		tooltip.style("visibility", "visible");
	// 	})
	// 	.on("mousemove", function() {
	// 		tooltip.style("top", (event.pageY - 10) + "px")
	// 		.style("left", (event.pageX + 12) + "px");
	// 	})
	// 	.on("mouseout", function() {
	// 		tooltip.style("visibility", "hidden");
	// 	});
}

onscroll = function() {
  scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 

  progressBar.transition().duration(0)
    .attr('height', function() { return yScaleL2(scrollTop); } );

  var topMax = $('body').height() - window.innerHeight;

  changeHome(scrollTop);
  if(drawDone) { changeCircle(scrollTop); }
};

var opacScale = d3.time.scale()
    .domain([0, 300]).range([1, 0]);

var opacScale2 = d3.time.scale()
    .domain([0, 100]).range([0, 1]);

function changeHome(d) {
    d3.select('#title').style('opacity', function() { return opacScale(d); });
    d3.select('#arrow').style('opacity', function() { return opacScale(d); });

    d3.select('#viz_right').style('opacity', function() { return opacScale2(d); });

    if(d > 300) {
        d3.select('#title').style('visibility', 'hidden');
        d3.select('#arrow').style('visibility', 'hidden');
    } else {
        d3.select('#title').style('visibility', 'visible');
        d3.select('#arrow').style('visibility', 'visible');
    }
}

function changeCircle(d) {

    // console.log('...');

    var currentPosition = yScaleL2(d);
    // console.log(currentPosition);

    circle.each(function(e) {
        var circlePosition = yScaleL(e.date);
        // console.log(circlePosition);
        if(circlePosition > currentPosition) {
            d3.select(this).style('opacity', 0);
        } else {
            d3.select(this).style('opacity', 1);
        }
    });
}


var currentDate = '20-May';
var cnt = 0;
var cnt_death = 0;

function getNumber(data) {

    for(var i = 0; i < data.length; i++) {
        var currentHospital = data[i].hospital;
        var currentCondition = data[i].condition;

        hospital.forEach(function(e) {
            if(currentHospital == e.icon) {
                e.num = e.num + 1;

                if(currentCondition == 'death') {
                    e.death = e.death + 1;
                    cnt_death = cnt_death + 1;
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




