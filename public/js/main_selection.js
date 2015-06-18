function mouseClickLayer(e) {

	var hospital_name = getInfos(e);

	circle.each(function(d) {

		var name;
		hospital.forEach(function(f) {
			if(d.hospital == f.icon) { name = f.name; }
		});

		if(hospital_name == name) {
			// d3.select(this).transition().duration(100).attr('r' , 3);
			// d3.select(this).attr('stroke', '#ed526f');
			d3.select(this).attr('stroke', 'red');
		} else {
			// d3.select(this).transition().duration(100).attr('r' , 2.6)
			d3.select(this).attr('stroke', 'rgba(0,0,0,0)');
		}
	});
}

function getInfos(e) {

	return e.layer._popup._content;
}