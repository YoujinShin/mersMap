
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