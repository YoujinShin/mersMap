// sigma.parsers.gexf.js
sigma.parsers.gexf(
    'lm.gexf',
    { // Here is the ID of the DOM element that
      // will contain the graph:
      // container: 'sigma-container',
      container: 'viz2',
      settings: {
        defaultNodeColor: '#ec5148'
      }
    },
    function(s) {
      console.log(s);
      // console.log(lm.gexf);
      // This function will be executed when the
      // graph is displayed, with "s" the related
      // sigma instance.
    }
  );