$(document).ready(function() {
    $('#submit').click(function(event) {
        var jqXHR = $.post("/widgets/create", {widgetname:"bla", widgetprice:10},
        function(data,status) {
            //alert(data + " : " + status);
            window.location.href = "/widgets/" + data.widget.id;
        }, 'json');
	    //.done(function() { alert("second success"); })
	    //.fail(function() { alert("error"); })
	    //.always(function() { alert("finished"); });
    });
});