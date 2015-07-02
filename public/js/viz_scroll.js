var yScale = d3.scale.linear()
	.domain([0, 39])
	.range([heightR - 90, 100]);

var yScaleR = d3.scale.linear() //age
	.domain([0, 110])
	.range([heightR - 90, 100]);

var xScale = d3.time.scale()
	.domain([ parseDate('20-May'), parseDate('21-Jun') ])
	.range([50, widthR - 50]);

var xAxis = d3.svg.axis()
	.scale(xScale)
	.orient('bottom')
	.ticks(7);

function initViz(data) {

	drawDone = true;

	// line - age
	line_age = svgR.selectAll("line")
			.data(ages)
		.enter().append("line")
		.attr('class', 'line_age')
		.attr('x1', function() { return 50; })
		.attr('x2', function() { return widthR - 50; })
		.attr('y1', function(d) { return yScaleR(0); })
		.attr('y2', function(d) { return yScaleR(0); })
		.attr('stroke', 'rgba(255,255,255,0.1)');

	// text - age
	text_age = svgR.selectAll("text")
			.data(ages)
		.enter().append("text")
		.attr('class', 'text_age')
		.attr('class', 'text_age')
		.text(function(d) { return d; })
		.attr('x', function() { return widthR - 70 + 10; })
		.attr('y', function(d) { return yScaleR(d) + 5; })
		.style('opacity', 0);


	// axis
	var ty = yScale(0) + 10;
	svgR.append("g")            // Add the X Axis
        .attr("class", "x axis")
        .attr("transform", "translate(0," + ty + ")")
        .call(xAxis);


 //    // circle
	circle = svgR.selectAll("circle")
			.data(data)
		.enter().append("circle")
		.attr('class', 'circles')
		.attr('cx', function(d) {  return xScale(d.date); })
		.attr('cy', function(d, i) { return yScale(d.y); })
		.attr("r", function(d) { return 2.6; })
		.style("fill", function(d) { return getColor(d); })
		.style("opacity", 0)
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

function getColor(d) {
	if(d.condition == 'death') { return  '#ed526f' }// pink: ed526f// purple: 444664
	else { return 'rgba(255,255,255,0.86)' }
}

function byAge() {
	circle.transition().duration(2000)
		.attr('cx', function(d) { return xScale(d.date); })
		.attr('cy', function(d, i) { return yScale2(d.age); });

	line_age.transition().duration(2000)
		.attr('y1', function(d) { return yScaleR(d); })
		.attr('y2', function(d) { return yScaleR(d); })
		.attr('stroke', 'rgba(255,255,255,0.4)');

	text_age.transition().duration(4000)
		.style('opacity', 1);
}


function byTime() {
	circle.transition().duration(2000)
		.attr('cx', function(d) { return xScale(d.date); })
		.attr('cy', function(d, i) { return yScale(d.y); });

	line_age.transition().duration(2000)
		.attr('y1', function(d) { return yScaleR(0); })
		.attr('y2', function(d) { return yScaleR(0); })
		.attr('stroke', 'rgba(255,255,255,0.1)');

	text_age.transition().duration(1000)
		.style('opacity', 0);
}

function getName(name) {

    hospital.forEach(function(e) {
        if(e.icon == name) { 
            hospitalName = e.name;
            return e.name; 
        }
    });
}
