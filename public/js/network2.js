window.s;

var g = {
      nodes:[],
      edges:[]
    };

var tooltip2 = d3.select("body")
  .append("div")
  .attr("id", "tooltip2");

// neighbor function
sigma.classes.graph.addMethod('neighbors', function(nodeId) {
  var k,
  neighbors = {},
  index = this.allNeighborsIndex[nodeId] || {};

  for (k in index)
    neighbors[k] = this.nodesIndex[k];

  return neighbors;
});

// define s
s = new sigma({
  graph:g,
  // container: 'body',
  container: 'viz2',
  settings: {
      // enableHovering: false,
      defaultHoverLabelBGColor: 'rgba(0,0,0,0.7)',
      defaultLabelHoverColor: '#fff',
      labelHoverShadowColor: 'none',
      defaultLabelSize: 10,
      defaultLabelColor: '#fff',
      font: 'Namsan',
      hoverFont: 'Namsan',
      maxEdgeSize: 0.6
      // zoomMin: 1
    }
});

// load gexf file
sigma.parsers.gexf(
  'lm4.gexf',
  s,
  function() {

    s.graph.nodes().forEach(function(n) {
      n.originalColor = n.color;
    });

    s.graph.edges().forEach(function(e) {
      e.originalColor = e.color;
    });

    s.refresh();
  }
);

// over node event
s.bind('overNode', function(e) {

  var attr = e.data.node.attributes;
  getName(attr.hospital);
  tooltip2.text('확진자 '+ e.data.node.label +', ' +attr.age + '세, ' +  hospitalName);
  tooltip2.style("visibility", "visible");
});

s.bind('outNode', function(e) {

  // var attr = e.data.node.attributes;
  // getName(attr.hospital);
  // tooltip2.text('확진자 '+ e.data.node.label +', ' +attr.age + '세, ' +  hospitalName);
  tooltip2.style("visibility", "hidden");
});

// click node event
s.bind('clickNode', function(e) {
  var nodeId = e.data.node.id,
      toKeep = s.graph.neighbors(nodeId);
  toKeep[nodeId] = e.data.node;

  s.graph.nodes().forEach(function(n) {
    if (toKeep[n.id])
      n.color = n.originalColor;
    else
      n.color = '#4e5173';
  });

  s.graph.edges().forEach(function(e) {
    if (toKeep[e.source] && toKeep[e.target])
      e.color = e.originalColor;
    else
      e.color = '#4e5173';
  });

  s.refresh();
});

// click stage event
s.bind('clickStage', function(e) {
  tooltip2.style("visibility", "hidden");

  s.graph.nodes().forEach(function(n) {
    n.color = n.originalColor;
  });

  s.graph.edges().forEach(function(e) {
    e.color = e.originalColor;
  });

  s.refresh();
});

// filter node by hospital
function filterNodes(hospital_name) {

  s.graph.nodes().forEach(function(d) {
    
    var name2;
    hospital.forEach(function(f) {
      if(d.attributes.hospital == f.icon) { name2 = f.name; }
    });

    if(hospital_name == name2) { d.color = d.originalColor; } 
    else { d.color = '#4e5173'; }
  });

  s.refresh();
}

// camera
c = s.camera;
$(document).ready(function(){
  // zoom_in
  $("#zoom_in").bind("click",function(){
    // c.goTo({
    //   ratio: c.ratio / c.settings('zoomingRatio')
    // }); 
    sigma.misc.animation.camera(c, {
      ratio: c.ratio / c.settings('zoomingRatio')
    }, {
      duration: 300
    });  
  });

  // zoom_out
  $("#zoom_out").bind("click",function(){

    // console.log(c.ratio);
    // c.goTo({
    //   ratio: c.ratio * c.settings('zoomingRatio')
    // });   
    sigma.misc.animation.camera(c, {
      ratio: c.ratio * c.settings('zoomingRatio')
    }, {
      duration: 300
    });
  });

});







