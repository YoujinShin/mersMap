window.drawDone = false;
window.mapClicked = false;
window.networkClicked = false;
window.aboutClicked = false;


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

graph = svgR.append("g")
    .attr("id", "graph");

// 
tooltip = d3.select("body")
	.append("div").attr("id", "tooltip");

// parseDate = d3.time.format("%e-%b").parse;
parseDate = d3.time.format("%m/%e/%y").parse;

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
    .domain([ parseDate('5/20/15'), parseDate('7/2/15') ])// .domain([ parseDate('20-May'), parseDate('21-Jun') ])
	// .domain([ parseDate('18-May'), parseDate('23-Jun') ])// .domain([ parseDate('20-May'), parseDate('21-Jun') ])
    .range([0, window.innerHeight]);

// scrollTop to left bar
var yScaleL2 = d3.time.scale()
    .domain([0, topMax])
    .range([0, window.innerHeight ]);

var progressBar = svgL.append('rect')
	.attr('x', 0).attr('y', 0)
	.attr('width', 4).attr('height', 0)
	.attr('fill', 'rgba(255,255,255,1)')
	.attr('stroke-width', 0);

// scrollTop to date
var dateScaleL = d3.time.scale()
    .domain([0, topMax])
    .range([ parseDate('5/20/15'), parseDate('7/2/15') ]);
    // .range([ '18-May', '23-Jun' ]);


// LOAD DATA
queue()
	// .defer(d3.csv, "/data/061621.csv")
    // .defer(d3.csv, "/data/070315.csv")
    .defer(d3.csv, "/data/070310.csv")
    .defer(d3.json, "/data/korea.json")
    .defer(d3.csv, "/data/mers_news_select.csv")
	.await(ready);

function ready(error, data, json, news) {
    // console.log(news);

    getNumber(data);

	data.forEach(function(d, i) { 
        
        if(d.condition != '') {
            d.condition_date = parseDate(d.condition_date);
            d.h = yScaleL(d.condition_date);
            // console.log(yScaleL(d.condition_date));
        } else {
            d.h = 'none';
        }
        
        d.date = parseDate(d.date);
        d.lat = +d.lat;
        d.lon = +d.lon;
    });

    news.forEach(function(d) {
        d.date = parseDate(d.date);
    });

    initViz(data);
    drawKorea(json, data);

	points = svgL.selectAll("rect")
			.data(news)
		.enter().append("rect")
        // .attr('class', 'points')
		.attr('x', function(d) { return 0; })
		.attr('y', function(d) { return yScaleL(d.date) - 0.5; })
		.attr("width", function(d) { return 4; })
		.attr("height", 1)
		.style("fill", 'rgba(255,255,255,1)' )
        .style('visibility', 'hidden')
		.attr('stroke', 'rgba(0,0,0,0)');
}

// onscroll functions
onscroll = function() {
  scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 

  progressBar.transition().duration(0)
    .attr('height', function() { return yScaleL2(scrollTop); } );

  changeHome(scrollTop);
  // if(drawDone) { changeCircle(scrollTop); }
  changeCircle(scrollTop);


  if(networkClicked) { }
  else if(aboutClicked) { }
  else { checkNews(scrollTop); }
  

  var currentNum  = dateScaleL(scrollTop);
  var format = d3.time.format("%m.%d.%Y");
  var currentDate = format(new Date(currentNum));

  $('#currentDate').text(currentDate);
};


var opacScale = d3.scale.linear()
    .domain([0, 300]).range([1, 0]);

var opacScale2 = d3.scale.linear()
    .domain([0, 100]).range([0, 1]);

var pointsShown = false;

// change home screen
function changeHome(d) {

    d3.select('#title').style('opacity', function() { return opacScale(d); });
    d3.select('#arrow').style('opacity', function() { return opacScale(d); });

    d3.select('#viz_right').style('opacity', function() { return opacScale2(d); });
    d3.select('.viz_mode').style('opacity', function() { return opacScale2(d); });
    // d3.select('.button').style('opacity', function() { return opacScale2(d); });

    d3.select('#bttnTime').style('opacity', function() { return opacScale2(d); });
    d3.select('#bttnAge').style('opacity', function() { return opacScale2(d); });
    d3.select('#bttnMap').style('opacity', function() { return opacScale2(d); });

    d3.select('#patients').style('opacity', function() { return opacScale2(d); });
    d3.select('#deaths').style('opacity', function() { return opacScale2(d); });
    d3.select('#recovered').style('opacity', function() { return opacScale2(d); });

    d3.select('#tooltip').style('opacity', function() { return opacScale2(d); });
    // d3.select('#states').style('opacity', function() { return opacScale2(d); });


    d3.select('#about').style('opacity', function() { return opacScale2(d); });
    d3.select('#network').style('opacity', function() { return opacScale2(d); });
    d3.select('#visualization').style('opacity', function() { return opacScale2(d); });
    d3.select('#dash').style('opacity', function() { return opacScale2(d); });
    d3.select('#dash2').style('opacity', function() { return opacScale2(d); });

    d3.select('#map_des').style('opacity', function() { return opacScale2(d); });
    d3.select('#net_des').style('opacity', function() { return opacScale2(d); });

    d3.select('#news1').style('opacity', function() { return opacScale2(d); });
    d3.select('#news2').style('opacity', function() { return opacScale2(d); });
    // d3.select('.points').style('opacity', function() { return opacScale2(d); });

    d3.select('#about_box ').style('opacity', function() { return opacScale2(d); });


    if(d > 300) {
        d3.select('#title').style('visibility', 'hidden');
        d3.select('#arrow').style('visibility', 'hidden');
        // d3.select('.points').style('visibility', 'visible');

        if(pointsShown == false) {
            points.each(function(e) {
                d3.select(this).style('visibility', 'visible');
                // console.log(e);
            });
        }
        
        pointsShown = true;

    } else {
        d3.select('#title').style('visibility', 'visible');
        d3.select('#arrow').style('visibility', 'visible');
        // d3.select('.points').style('visibility', 'hidden');

        if(pointsShown == true) {
            points.each(function(e) {
                d3.select(this).style('visibility', 'hidden');
                // console.log(e);
            });
        }

        pointsShown = false;
    }
}

// update circle
function changeCircle(d) {

    if(mapClicked) {
        checkCircle2();
    } else {
        checkCircle();
    }
}

function checkCircle() {

    var currentPosition = yScaleL2(scrollTop);
    var patients = 0;
    var deaths = 0;
    var recovered = 0;

    circle.each(function(e) {
        var circlePosition = yScaleL(e.date);
        d3.select(this).style('fill', 'rgba(255,255,255,0.5)');
        
        if(circlePosition > currentPosition) {
            d3.select(this).style('opacity', 0);
        } else {
            d3.select(this).style('opacity', 1);
            patients = patients + 1;
            // color 
            if(e.h !== 'none') {

                if(e.h < currentPosition) {
                    if(e.condition == 'death') { 

                        d3.select(this).style('fill', '#ed5268'); //ed5268 // #ed526f
                        deaths = deaths + 1;
                    }
                    else if(e.condition == 'recovered') { 
                        // d3.select(this).style('fill', 'rgba(82,237,215,1)');
                        d3.select(this).style('fill', 'rgba(255,255,255,0.12)');
                        recovered = recovered + 1;
                    }
                }
            } else { 
                d3.select(this).style('fill', 'rgba(255,255,255,0.6)');
            }
        }
    });

    $('#num_patients').text(patients);
    $('#num_deaths').text(deaths);
    $('#num_recovered').text(recovered);
}


function checkCircle2() {

    var currentPosition = yScaleL2(scrollTop);
    var patients = 0;
    var deaths = 0;
    var recovered = 0;

    circle2.each(function(e) {
        var circlePosition = yScaleL(e.date);
        d3.select(this).style('fill', 'rgba(255,255,255,0.5)');
        
        if(circlePosition > currentPosition) {
            d3.select(this).style('opacity', 0);
        } else {
            d3.select(this).style('opacity', 1);
            patients = patients + 1;
            // color 
            if(e.h !== 'none') {

                if(e.h < currentPosition) {
                    if(e.condition == 'death') { 

                        d3.select(this).style('fill', '#ed5268'); //ed5268 // #ed526f
                        deaths = deaths + 1;
                    }
                    else if(e.condition == 'recovered') { 
                        // d3.select(this).style('fill', 'rgba(82,237,215,1)');
                        d3.select(this).style('fill', 'rgba(255,255,255,0.12)');
                        recovered = recovered + 1;
                    }
                }
            } else { 
                d3.select(this).style('fill', 'rgba(255,255,255,0.6)');
            }
        }
    });

    $('#num_patients').text(patients);
    $('#num_deaths').text(deaths);
    $('#num_recovered').text(recovered);
}

// function checkCircle2() {

//     var currentPosition = yScaleL2(scrollTop);
//     var patients = 0;
//     var deaths = 0;
//     var recovered = 0;

//     circle2.each(function(e) {
//         var circlePosition = yScaleL(e.date);
        
//         if(circlePosition > currentPosition) {
//             d3.select(this).style('opacity', 0);
//         } else {
//             d3.select(this).style('opacity', 1);
//             if(e.condition == 'death') { deaths = deaths + 1; }
//             patients = patients + 1;
//         }
//     });
    
//     $('#num_patients').text(patients);
//     $('#num_deaths').text(deaths);
// }

//
// var currentDate = '20-May';
var currentDate = '5/20/15';
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


