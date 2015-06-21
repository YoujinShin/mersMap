window.nodes;
window.edges;
// window.s;

var tooltip2 = d3.select("body")
  .append("div")
  .attr("id", "tooltip2");

sigma.classes.graph.addMethod('neighbors', function(nodeId) {
  var k,
  neighbors = {},
  index = this.allNeighborsIndex[nodeId] || {};

  for (k in index)
    neighbors[k] = this.nodesIndex[k];

  return neighbors;
});


s = new sigma.parsers.gexf(
  'lm.gexf',
  { 
    container: 'viz2',
    settings: {
      enableHovering: false,
      defaultLabelSize: 10,
      defaultLabelColor: '#fff',
      font: 'Namsan'
      // drawLabels: false
      // defaultNodeColor: '#ec5148'
    }
  },

  function(s) {
      nodes = s.graph.nodes();
      edges = s.graph.edges();
      // console.log(nodes);
    
      s.graph.nodes().forEach(function(n) {
        n.originalColor = n.color;
        // console.log(n);
        // n.label = '확진자 ' + n.label;
      });
      s.graph.edges().forEach(function(e) {
        e.originalColor = e.color;
      });

      // click node
      s.bind('clickNode', function(e) {
        var nodeId = e.data.node.id,
            toKeep = s.graph.neighbors(nodeId);
        toKeep[nodeId] = e.data.node;

        // console.log(e.data.node);
        var attr = e.data.node.attributes;
        getName(attr.hospital);
        tooltip2.text('확진자 '+ e.data.node.label +', ' +attr.age + '세, ' +  hospitalName);
        tooltip2.style("visibility", "visible");

        s.graph.nodes().forEach(function(n) {
          // console.log(n);
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

      // click stage
      s.bind('clickStage', function(e) {
        tooltip2.style("visibility", "hidden");

        s.graph.nodes().forEach(function(n) {
          n.color = n.originalColor;
        });

        s.graph.edges().forEach(function(e) {
          e.color = e.originalColor;
        });

        // Same as in the previous event:
        s.refresh();
      });



      // function filterNodes(hospital_name) {
      //     s.graph.nodes().forEach(function(d) {
      //     console.log(d);
      //     var name2;
      //     hospital.forEach(function(f) {
      //       if(d.attributes.hospital == f.icon) { name2 = f.name; }
      //     });

      //     if(hospital_name == name2) {
      //       d.color = d.originalColor;
      //     } else {
      //       d.color = '#4e5173';
      //     }
      //   });
      // }
  }
);

function filterNodes(hospital_name) {
  // console.log(s.graph);
  nodes.forEach(function(d) {
    
    var name2;
    hospital.forEach(function(f) {
      if(d.attributes.hospital == f.icon) { name2 = f.name; }
    });

    if(hospital_name == name2) {
      
      // d.color = d.originalColor;
      d.color = '#4e5173';
      console.log(d.color);
    } else {
      d.color = '#4e5173';
    }
  });

}



  