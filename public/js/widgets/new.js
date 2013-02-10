$(document).ready(function() {
    $('#submit').click(function(event) {
        var name = $("#widgetname").val();
        var price = $("#widgetprice").val();
	//        alert("Adding widget with name : " + name + " and price " + price);
        var jqXHR = $.post("/widgets/create", {widgetname:name, widgetprice:price},
        function(data,status) {
            //alert(data + " : " + status);
            window.location.href = "/widgets/" + data.widget.id + "/show";
        }, 'json');
	    //.done(function() { alert("second success"); })
	    //.fail(function() { alert("error"); })
	    //.always(function() { alert("finished"); });
    });
});