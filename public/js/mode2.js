
$('#bttnTime').click(function() {
	$('#bttnTime').css('border-color', 'rgba(255,255,255,0.5)');
	$('#bttnAge').css('border-color', 'rgba(255,255,255,0)');
	$('#bttnMap').css('border-color', 'rgba(255,255,255,0)');

	$('#')

	byTime();
});

$('#bttnAge').click(function() {
	$('#bttnTime').css('border-color', 'rgba(255,255,255,0)');
	$('#bttnAge').css('border-color', 'rgba(255,255,255,0.5)');
	$('#bttnMap').css('border-color', 'rgba(255,255,255,0)');

	byAge();
});

$('#bttnMap').click(function() {
	$('#bttnTime').css('border-color', 'rgba(255,255,255,0)');
	$('#bttnAge').css('border-color', 'rgba(255,255,255,0)');
	$('#bttnMap').css('border-color', 'rgba(255,255,255,0.5)');

	byMap();
});

/////////////////////////////////////////
$('#network').click(function() {

	$('#viz_right').css('visibility', 'hidden');
	$('#viz_left').css('visibility', 'hidden');
	$('#viz2').css('visibility', 'visible');

	$('#bttnTime').css('visibility', 'hidden');
	$('#bttnAge').css('visibility', 'hidden');
	$('#bttnMap').css('visibility', 'hidden');

	$('#patients').css('visibility', 'hidden');
	$('#deaths').css('visibility', 'hidden');

	d3.select('#map_des').style('visibility', 'hidden');
	d3.select('#net_des').style('visibility', 'visible');
	
	sigma.misc.animation.camera(c, {
		// ratio: c.ratio / c.settings('zoomingRatio')
		ratio: 0.72, //0.28
		x: -50, 
    	y: -50
    }, { duration: 800 });
});


$('#visualization').click(function() {

	$('#viz_right').css('visibility', 'visible');
	$('#viz_left').css('visibility', 'visible');
	$('#viz2').css('visibility', 'hidden');

	$('#bttnTime').css('visibility', 'visible');
	$('#bttnAge').css('visibility', 'visible');
	$('#bttnMap').css('visibility', 'visible');

	$('#patients').css('visibility', 'visible');
	$('#deaths').css('visibility', 'visible');

	if(mapClicked) {
		d3.select('#map_des').style('visibility', 'visible');
	} else {
		d3.select('#map_des').style('visibility', 'hidden');
	}

	d3.select('#net_des').style('visibility', 'hidden');
});

$( document ).ready(function() {
    console.log( "ready!" );

    var newsH = $('#news2_des_box').height();
    $('#news2').css('height', newsH + 202 + 'px');

    var imgW = $('#news2_img').width();
    // console.log(imgW);
    $('#news2_img').css('margin-left', -imgW/2+'px');
});










