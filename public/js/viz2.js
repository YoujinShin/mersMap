var width = $('#viz').width(),
	height = $('#viz').height(),
	padding = 3, // separation between nodes
	maxRadius = 14;

var hospitalName;

var svg = d3.select('#viz').append('svg')
	.attr('width', width)
	.attr('height', height);

var tooltip = d3.select("body")
  .append("div")
  .attr("id", "tooltip");

var parseDate2 = d3.time.format("%e-%b").parse;

var xScale = d3.time.scale()
	.domain([ parseDate2('20-May'), parseDate2('8-Jun') ])
	.range([60, width - 60]);

var yScale = d3.scale.linear()
	.domain([0, 40])
	.range([height*0.6, 180]);

var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient('bottom')
	.ticks(6);


function initViz(data) {

	circle = svg.selectAll("circle")
			.data(data)
		.enter().append("circle")
		.attr('cx', function(d) { return xScale(d.date); })
		.attr('cy', function(d) { return yScale(d.y); })
		.attr("r", function(d) { return 2; })
		.style("fill", function(d) { return 'rgba(255,255,255,0.8)'; })
		.on("mouseover", function(d) {

			getName(d.hospital);

			tooltip.text(hospitalName);
			tooltip.style("visibility", "visible");
		})
		.on("mousemove", function() {
			tooltip.style("top", (event.pageY - 10) + "px")
			.style("left", (event.pageX + 12) + "px");
		})
		.on("mouseout", function() {
			tooltip.style("visibility", "hidden");
		});

	var ty = yScale(0) + 30;
	svg.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + ty + ')')
		.call(xAxis);
}


function getName(name) {

	hospital.forEach(function(e) {
		if(e.icon == name) { 
			hospitalName = e.name;
			return e.name; 
		}
	});
}
