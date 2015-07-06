function checkNews(d) {

	var currentPosition = yScaleL2(d);
	var selectedStory;

	points.each(function(e, i) {
        var pointPosition = yScaleL(e.date);
        
        if(pointPosition > currentPosition) {
            d3.select(this).style('fill', 'white');
            
        } else {
            d3.select(this).style('fill', 'black');
            selectedStory = e;
            selectedNum = i;
        }
    });

    if(selectedStory == undefined) { }
    else {

    	if(selectedStory.Image == "" ) {
    		// news without image -> news1
    		$('#news1').css('visibility', 'visible');
    		$('#news2').css('visibility', 'hidden');

            d3.select('#news1_title').text(selectedStory.Title);
            d3.select('#news1_date').text(selectedStory.date2);
            d3.select('#news1_des').text(selectedStory.Description);

    	}else {
    		// news with image -> news2
    		$('#news1').css('visibility', 'hidden');
    		$('#news2').css('visibility', 'visible');

            d3.select('#news2_title').text(selectedStory.Title);
            d3.select('#news2_date').text(selectedStory.date2);
            d3.select('#news2_des').text(selectedStory.Description);

            if(selectedStory.Video == "") {
                $('#news2_img').attr('src', selectedStory.Image);
                 $('#news2_video').html("");
            } else {
                $('#news2_img').attr('src', "");
                $('#news2_video').html(selectedStory.Video);
            }
            

            positioning();
    	}
    	// console.log(selectedStory.Image );
    	// console.log(selectedNum);
    }
}


function positioning() {
    var newsH = $('#news2_des_box').height();
    $('#news2').css('height', newsH + 202 + 'px');

    var imgW = $('#news2_img').width();
    // console.log(imgW);
    $('#news2_img').css('margin-left', -imgW/2+'px');
}
