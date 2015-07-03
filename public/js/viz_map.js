// var width = 700,
//     height = 700;
// var initialScale = 5500,
// initialX = -11900,
// initialY = 4050,

var initialScale = 4300,
initialX = -11000 + 1600,
initialY = 3800 - 470,
centered,
labels;

var projection = d3.geo.mercator()
    .scale(initialScale)
    .translate([initialX, initialY]);

var path = d3.geo.path()
    .projection(projection);

var zoom = d3.behavior.zoom()
    .translate(projection.translate())
    .scale(projection.scale())
    .scaleExtent([heightR, 800 * heightR])
    .on("zoom", zoom);

var states = svgR.append("g")
    .attr("id", "states")
    .call(zoom);

function drawKorea(json, data) {

  states.selectAll("path")
      .data(json.features)
    .enter().append("path")
      .attr("d", path)
      .attr("id", function(d) { return 'path-'+d.id; })
      .on("click", click);
  
  circle2 = states.selectAll("circle")
      .data(data)
    .enter().append("circle")
    .attr('class', 'circles')
    .attr("transform", function(d) {
      return "translate("+
        // projection([ 36.068316323235322, 127.637748901773705]) 
        projection([ d.lon, d.lat ])  // lat, lon
      + ")"
    })
    .attr("r", function(d) { return 2.2; })
    .style("fill", function(d) { return getColor(d); })
    .style("opacity", 0.4)
    .attr('stroke', 'rgba(0,0,0,0)')
    .attr('stroke-width', 1.2);
};

function click(d) {
  var x, y, k;

  if (d && centered !== d) {
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 4;
    centered = d;
  } else {
    x = widthR / 2;
    y = heightR / 2;
    k = 1;
    centered = null;
  }

  states.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  states.transition()
      .duration(1000)
      .attr("transform", "translate(" + widthR / 2 + "," + heightR / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");
}

