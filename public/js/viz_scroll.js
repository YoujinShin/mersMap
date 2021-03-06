var yScale = d3.scale.linear()
	.domain([0, 40])
	.range([heightR - 70, 100]);

var yScaleR = d3.scale.linear() //age
	.domain([0, 110])
	.range([heightR - 70, 100]);

var xScale = d3.time.scale()
	.domain([ parseDate('5/20/15'), parseDate('7/2/15') ])
	// .domain([ parseDate('5/20/15'), parseDate('6/21/15') ])
	.range([40, widthR - 40]);

var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient('bottom')
	.ticks(7);

function initViz(data) {

	drawDone = true;

	// line - age
	line_age = graph.selectAll("line")
			.data(ages)
		.enter().append("line")
		.attr('class', 'line_age')
		.attr('x1', function() { return 50; })
		.attr('x2', function() { return widthR - 50; })
		.attr('y1', function(d) { return yScaleR(0); })
		.attr('y2', function(d) { return yScaleR(0); })
		.attr('stroke', 'rgba(255,255,255,0)');

	// text - age
	text_age = graph.selectAll("text")
			.data(ages)
		.enter().append("text")
		.attr('class', 'text_age')
		.text(function(d) { return d; })
		// .attr('x', function() { return widthR - 70 + 10; })
		.attr('x', function() { return 20; })
		.attr('y', function(d) { return yScaleR(d) + 3; })
		.style('opacity', 0);


	// axis
	var ty = yScale(0) + 10;
	graph.append("g")            // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + ty + ")")
        .call(xAxis);


 //    // circle
	circle = graph.selectAll("circle")
			.data(data)
		.enter().append("circle")
		.attr('class', 'circles')
		.attr('cx', function(d) {  return xScale(d.date); })
		.attr('cy', function(d, i) { return yScale(d.y); })
		.attr("r", function(d) { return 2; })
		.style("fill", function(d) { return getColor(d); })
		.style("opacity", 0)
		.attr('stroke', 'rgba(0,0,0,0)')
		.attr('stroke-width', 1.2);
		// .on("mouseover", function(d,i) {

		// 	getName(d.hospital);

		// 	tooltip.text(d.age + '세, ' +  hospitalName);
		// 	tooltip.style("visibility", "visible");
		// })
		// .on("mousemove", function() {
		// 	tooltip.style("top", (event.pageY - 10) + "px")
		// 	.style("left", (event.pageX + 12) + "px");
		// })
		// .on("mouseout", function() {
		// 	tooltip.style("visibility", "hidden");
		// });
}

function getColor(d) {
	return 'rgba(255,255,255,0.6)';
	// if(d.condition == 'death') { return  '#ed526f' }// pink: ed526f// purple: 444664
	// else { return 'rgba(255,255,255,0.86)' }
}

function byAge() {
	// circle.transition().duration(0).style('opacity', 1);
	d3.select('#states').style('visibility', 'hidden');
	d3.select('#graph').style('visibility', 'visible');
	d3.select('#map_des').style('visibility', 'hidden');

	checkCircle();

	circle.transition().duration(2000)
		.attr('cx', function(d) { return xScale(d.date); })
		.attr('cy', function(d, i) { return yScaleR(d.age); });

	line_age.transition().duration(2000)
		.attr('y1', function(d) { return yScaleR(d); })
		.attr('y2', function(d) { return yScaleR(d); })
		.attr('stroke', 'rgba(255,255,255,0.4)');

	text_age.transition().duration(4000)
		.style('opacity', 1);

	mapClicked = false;
}

function byTime() {
	// circle.transition().duration(0).style('opacity', 1);
	d3.select('#states').style('visibility', 'hidden');
	d3.select('#graph').style('visibility', 'visible');
	d3.select('#map_des').style('visibility', 'hidden');

	checkCircle();

	circle.transition().duration(2000)
		.attr('cx', function(d) { return xScale(d.date); })
		.attr('cy', function(d, i) { return yScale(d.y); });

	line_age.transition().duration(2000)
		.attr('y1', function(d) { return yScaleR(0); })
		.attr('y2', function(d) { return yScaleR(0); })
		.attr('stroke', 'rgba(255,255,255,0)');

	text_age.transition().duration(1000)
		.style('opacity', 0);

	mapClicked = false;
}

function byMap() {

	d3.select('#states').style('visibility', 'visible');
	d3.select('#graph').style('visibility', 'hidden');
	d3.select('#map_des').style('visibility', 'visible');

	checkCircle2();
	mapClicked = true;
}

function getName(name) {

    hospital.forEach(function(e) {
        if(e.icon == name) { 
            hospitalName = e.name;
            return e.name;
        }
    });
}
