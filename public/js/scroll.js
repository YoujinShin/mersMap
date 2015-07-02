var widthL = $('#viz_left').width(),
	heightL = $('#viz_left').height();

var svgL = d3.select('#viz_left').append('svg')
	.attr('width', widthL).attr('height', heightL);

var tooltip = d3.select("body")
	.append("div").attr("id", "tooltip");

var parseDate = d3.time.format("%e-%b").parse;

var topMax = $('body').height() - window.innerHeight;

var yScaleL = d3.time.scale()
	.domain([ parseDate('18-May'), parseDate('30-Jun') ])
	// .domain([ parseDate('20-May'), parseDate('21-Jun') ])
	.range([0, topMax]);

var yScaleL2 = d3.time.scale()
    .domain([0, topMax])
    .range([0, window.innerHeight ]);

var progressBar = svgL.append('rect')
	.attr('x', 0).attr('y', 0)
	.attr('width', 6).attr('height', 0)
	.attr('fill', 'rgba(255,255,255,1)')
	.attr('stroke-width', 0);


queue()
	.defer(d3.csv, "/data/061621.csv")
	.await(drawTimeline);


function drawTimeline(error, data) {
	data.forEach(function(d) { 
        d.date = parseDate(d.date);
    });

	// points = svgL.selectAll("rect")
	// 		.data(data)
	// 	.enter().append("rect")
	// 	.attr('x', function(d) { return 0; })
	// 	.attr('y', function(d, i) { return yScaleL(d.date) - 1; })
	// 	.attr("width", function(d) { return 14; })
	// 	.attr("height", 2)
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
};

var opacScale = d3.time.scale()
    .domain([0, 300])
    .range([1, 0]);

function changeHome(d) {
    d3.select('#title').style('opacity', function() { return opacScale(d); });
    d3.select('#arrow').style('opacity', function() { return opacScale(d); });

    if(d > 300) {
        d3.select('#title').style('visibility', 'hidden');
        d3.select('#arrow').style('visibility', 'hidden');
    } else {
        d3.select('#title').style('visibility', 'visible');
        d3.select('#arrow').style('visibility', 'visible');
    }
}



