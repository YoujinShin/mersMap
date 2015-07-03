
$('#bttnTime').click(function() {
	$('#bttnTime').css('border-color', 'rgba(255,255,255,0.5)');
	$('#bttnAge').css('border-color', 'rgba(255,255,255,0)');
	$('#bttnNet').css('border-color', 'rgba(255,255,255,0)');

	byTime();
});

$('#bttnAge').click(function() {
	$('#bttnTime').css('border-color', 'rgba(255,255,255,0)');
	$('#bttnAge').css('border-color', 'rgba(255,255,255,0.5)');
	$('#bttnNet').css('border-color', 'rgba(255,255,255,0)');

	byAge();
});