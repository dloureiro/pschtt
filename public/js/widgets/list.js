$.get('templates/widgetList.html',function(dataTpl){
	$.get('widgets', function(data) {
		var html = Mustache.to_html(dataTpl, data);
		$('body').html(html);
	    });
    },"html");