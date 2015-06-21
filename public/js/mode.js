
// mouseover
$('#icon_hospital').mouseover(function() { $(this).css('opacity','0.6'); });
$('#icon_hospital').mouseout(function() { $(this).css('opacity','1'); });

$('#icon_patient').mouseover(function() { $(this).css('opacity','0.6'); });
$('#icon_patient').mouseout(function() { $(this).css('opacity','1'); });

$('#zoom_in').mouseover(function() { $(this).css('opacity','0.6'); });
$('#zoom_in').mouseout(function() { $(this).css('opacity','1'); });

$('#zoom_out').mouseover(function() { $(this).css('opacity','0.6'); });
$('#zoom_out').mouseout(function() { $(this).css('opacity','1'); });


$('#icon_time').click(function() {
	$('#icon_time').css('background-color','#ed526f');
	$('#icon_age').css('background-color', 'rgba(255,255,255,0.2)');
	$('#icon_network').css('background-color', 'rgba(255,255,255,0.2)');

	byTime();
	$('.node').css('visibility', 'hidden');
	$('.link').css('visibility', 'hidden');

	$('.circles').css('visibility', 'visible');
	$('.line_age').css('visibility', 'visible');
	$('.text_age').css('visibility', 'visible');
	$('.axis').css('visibility', 'visible');

	$('#viz').css('visibility', 'visible');
	$('#viz2').css('visibility', 'hidden');
	$('#zoom_in').css('visibility', 'hidden');
	$('#zoom_out').css('visibility', 'hidden')
});

$('#icon_age').click(function() {
	$('#icon_age').css('background-color','#ed526f');
	$('#icon_time').css('background-color', 'rgba(255,255,255,0.2)');
	$('#icon_network').css('background-color', 'rgba(255,255,255,0.2)');

	byAge();
	$('.node').css('visibility', 'hidden');
	$('.link').css('visibility', 'hidden');

	$('.circles').css('visibility', 'visible');
	$('.line_age').css('visibility', 'visible');
	$('.text_age').css('visibility', 'visible');
	$('.axis').css('visibility', 'visible');

	$('#viz').css('visibility', 'visible');
	$('#viz2').css('visibility', 'hidden');
	$('#zoom_in').css('visibility', 'hidden');
	$('#zoom_out').css('visibility', 'hidden');
});

$('#icon_network').click(function() {
	$('#icon_age').css('background-color','rgba(255,255,255,0.2)');
	$('#icon_time').css('background-color', 'rgba(255,255,255,0.2)');
	$('#icon_network').css('background-color', '#ed526f');

	// byAge();
	$('.node').css('visibility', 'visible');
	$('.link').css('visibility', 'visible');

	$('.circles').css('visibility', 'hidden');
	$('.line_age').css('visibility', 'hidden');
	$('.text_age').css('visibility', 'hidden');
	$('.axis').css('visibility', 'hidden');

	$('#viz2').css('visibility', 'visible');
	$('#viz').css('visibility', 'hidden');
	$('#zoom_in').css('visibility', 'visible');
	$('#zoom_out').css('visibility', 'visible');

	sigma.misc.animation.camera(c, {
		// ratio: c.ratio / c.settings('zoomingRatio')
		ratio: 0.28,
		x: -60, 
    	y: 20
    }, {
    	duration: 800
    });

    // c.goTo({
    // 	x: 0, 
    // 	y: height/2
    // }); 

	// loadGraph('lm.gexf');
	// force.resume();
});


