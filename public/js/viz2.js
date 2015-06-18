var width = $('#viz').width(),
	height = $('#viz').height(),
	padding = 3, // separation between nodes
	maxRadius = 14;

var hospitalName;

var svg = d3.select('#viz').append('svg')
	.attr('width', width)
	.attr('height', height);

var g = svg.append('g')
	.attr('class', 'x axis')
	.attr('transform', 'translate(0, 0)');
	// .call(xAxis);

var tooltip = d3.select("body")
  .append("div")
  .attr("id", "tooltip");

var parseDate2 = d3.time.format("%e-%b").parse;

var xScale = d3.time.scale()
	.domain([ parseDate2('20-May'), parseDate2('16-Jun') ])
	// .domain([ parseDate2('19-May'), parseDate2('17-Jun') ])
	.range([70, width - 70]);

var yScale = d3.scale.linear()
	.domain([0, 38])
	.range([height - 80, 120]);

var yScale2 = d3.scale.linear() //age
	.domain([0, 100])
	.range([height - 80, 120]);

var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient('bottom')
	.ticks(7);

// g.call(xAxis);


function initViz(data) {

	circle = svg.selectAll("circle")
			.data(data)
		.enter().append("circle")
		.attr('cx', function(d) { return xScale(d.date); })
		.attr('cy', function(d, i) { return yScale(d.y); })
		.attr("r", function(d) { return 2.6; })
		.style("fill", function(d) { return getColor(d); })
		.on("mouseover", function(d,i) {

			getName(d.hospital);

			tooltip.text(d.age + '세, ' +  hospitalName);
			tooltip.style("visibility", "visible");

		})
		.on("mousemove", function() {
			tooltip.style("top", (event.pageY - 10) + "px")
			.style("left", (event.pageX + 12) + "px");
		})
		.on("mouseout", function() {
			tooltip.style("visibility", "hidden");
		});

	// var ty = yScale(0) + 30;
	// svg.append('g')
	// 	.attr('class', 'x axis')
	// 	.attr('transform', 'translate(0,' + ty + ')')
	// 	.call(xAxis);
}


function getName(name) {

	hospital.forEach(function(e) {
		if(e.icon == name) { 
			hospitalName = e.name;
			return e.name; 
		}
	});
}


function getColor(d) {
	if(d.condition == 'death') { return  '#444664' }//rgba(255,0,0,0.8) // pink: ed526f// purple: 444664
	else { return 'rgba(255,255,255,0.86)' }
}


function byAge() {
	circle.transition().duration(2000)
		.attr('cx', function(d) { return xScale(d.date); })
		.attr('cy', function(d, i) { return yScale2(d.age); });
}

function byTime() {
	circle.transition().duration(2000)
		.attr('cx', function(d) { return xScale(d.date); })
		.attr('cy', function(d, i) { return yScale(d.y); });
}


