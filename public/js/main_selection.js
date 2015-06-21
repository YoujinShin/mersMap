function mouseClickLayer(e) {

	var hospital_name = getInfos(e);

	circle.each(function(d) {

		var name;
		hospital.forEach(function(f) {
			if(d.hospital == f.icon) { name = f.name; }
		});

		if(hospital_name == name) {
			d3.select(this).attr('opacity', 1);
		} else {
			d3.select(this).transition().duration(100)
				.attr('opacity', 0.1);
		}
	});

	// node.each(function(d) {
	// 	// console.log(d.attributes.hospital);
	// 	var name2;
	// 	hospital.forEach(function(f) {
	// 		if(d.attributes.hospital == f.icon) { name2 = f.name; }
	// 	});

	// 	if(hospital_name == name2) {
	// 		d3.select(this).attr('opacity', 1);
	// 	} else {
	// 		d3.select(this).transition().duration(100)
	// 			.attr('opacity', 0.1);
	// 	}
	// });

	filterNodes(hospital_name);
}

function getInfos(e) {

	return e.layer._popup._content;
}

function popupClose(e) {
	// console.log(e);
	circle.each(function(d) {
		d3.select(this).transition().duration(100)
			.attr('opacity', 1);
	});

	// node.each(function(d) {
	// 	d3.select(this).transition().duration(100)
	// 		.attr('opacity', 1);
	// });

	s.graph.nodes().forEach(function(n) {
    	n.color = n.originalColor;
	});

	s.graph.edges().forEach(function(e) {
	    e.color = e.originalColor;
	});

	s.refresh();
}


