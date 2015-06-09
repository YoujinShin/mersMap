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

function initViz(data) {

nodes = d3.range(data.length).map(function(j) {

    var x_value = width/2 + Math.random()*130;
    var y_value = height*0.5 + Math.random()*130;
    var c = 'rgba(255,255,255,0.5)';
    var v = 12;

    // console.log(data[j].Hospital_name);

    return {
      name: data[j].Hospital_name,
      radius: v,
      color: c,
      cx: x_value,
      cy: y_value
    };
  });

  force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(0)
      .charge(0)
      .on("tick", tick)
      .start();

  circle = svg.selectAll("circle")
      .data(nodes)
    .enter().append("circle")
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d) { return d.color; })
      .on("mouseover", function(d) {

      	getName(d.name);
      	console.log(hospitalName);

        tooltip.text(hospitalName);
        tooltip.style("visibility", "visible");
      })
      .on("mousemove", function() {

        tooltip.style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 12) + "px");
      })
      .on("mouseout", function() {

        tooltip.style("visibility", "hidden");
      })
      .call(force.drag);

}

// Move nodes toward cluster focus.
function gravity(alpha) {
  return function(d) {
    d.y += (d.cy - d.y) * alpha;
    d.x += (d.cx - d.x) * alpha;
  };
}


function tick(e) {
  circle
      .each(gravity(.05 * e.alpha)) //0.2
      .each(collide(.1))//0.5
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

// Resolve collisions between nodes.
function collide(alpha) {

  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    var r = d.radius + maxRadius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}

function getName(name) {

	hospital.forEach(function(d) {
		
		if(d.icon == name) { 
			// console.log(name + ', ' + d.name);
			hospitalName = d.name;
			return d.name; 
		}
	});
}
