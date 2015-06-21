var width = $('#viz').width(),
	height = $('#viz').height();

var hospitalName;

var svg = d3.select('#viz').append('svg')
	.attr('width', width)
	.attr('height', height);

var tooltip = d3.select("body")
  .append("div")
  .attr("id", "tooltip");

var parseDate2 = d3.time.format("%e-%b").parse;

var xScale = d3.time.scale()
	.domain([ parseDate2('20-May'), parseDate2('18-Jun') ])
	// .domain([ parseDate2('19-May'), parseDate2('17-Jun') ])
	// .range([70, width - 70]);
	.range([70, width - 70]);

var yScale = d3.scale.linear()
	.domain([0, 38])
	.range([height - 140, 10]);

var yScale2 = d3.scale.linear() //age
	.domain([0, 110])
	.range([height - 140, 100]);

var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient('bottom')
	.ticks(7);

var ages = [ 0, 20, 40, 60, 80 ];


function initViz(data) {

	// line - age
	line_age = svg.selectAll("line")
			.data(ages)
		.enter().append("line")
		.attr('class', 'line_age')
		.attr('x1', function() { return 70; })
		.attr('x2', function() { return width - 70; })
		.attr('y1', function(d) { return yScale2(0); })
		.attr('y2', function(d) { return yScale2(0); })
		.attr('stroke', 'rgba(255,255,255,0.1)');

	// text - age
	text_age = svg.selectAll("text")
			.data(ages)
		.enter().append("text")
		.attr('class', 'text_age')
		.attr('class', 'text_age')
		.text(function(d) { return d +'세'; })
		.attr('x', function() { return width - 70 + 10; })
		.attr('y', function(d) { return yScale2(d) + 5; })
		.style('opacity', 0);


	// axis
	var ty = yScale(0) + 10;
	svg.append("g")            // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + ty + ")")
        .call(xAxis);


 //    // circle
	circle = svg.selectAll("circle")
			.data(data)
		.enter().append("circle")
		.attr('class', 'circles')
		.attr('cx', function(d) { return xScale(d.date); })
		.attr('cy', function(d, i) { return yScale(d.y); })
		.attr("r", function(d) { return 2.6; })
		.style("fill", function(d) { return getColor(d); })
		.attr('stroke', 'rgba(0,0,0,0)')
		.attr('stroke-width', 1.2)
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
	if(d.condition == 'death') { return  '#ed526f' }// pink: ed526f// purple: 444664
	else { return 'rgba(255,255,255,0.86)' }
}


function byAge() {
	circle.transition().duration(2000)
		.attr('cx', function(d) { return xScale(d.date); })
		.attr('cy', function(d, i) { return yScale2(d.age); });

	line_age.transition().duration(2000)
		.attr('y1', function(d) { return yScale2(d); })
		.attr('y2', function(d) { return yScale2(d); })
		.attr('stroke', 'rgba(255,255,255,0.4)');

	text_age.transition().duration(4000)
		.style('opacity', 1);
}


function byTime() {
	circle.transition().duration(2000)
		.attr('cx', function(d) { return xScale(d.date); })
		.attr('cy', function(d, i) { return yScale(d.y); });

	line_age.transition().duration(2000)
		.attr('y1', function(d) { return yScale2(0); })
		.attr('y2', function(d) { return yScale2(0); })
		.attr('stroke', 'rgba(255,255,255,0.1)');

	text_age.transition().duration(1000)
		.style('opacity', 0);
}


