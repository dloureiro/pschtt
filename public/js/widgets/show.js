$.get('/templates/widgetShow.html',function(dataTpl){
	$.get('/widgets/'+url("2"), function(data) {
		var html = Mustache.to_html(dataTpl, data);
		$('body').html(html);
	    });
    },"html");