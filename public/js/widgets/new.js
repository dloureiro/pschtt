$(document).ready(function() {
    $('#submit').click(function(event) {
	alert($('#myForm').serialize());
        var jqXHR = $.post("/widgets/create", $('#myForm').serialize(),
        function(data,status) {
            alert(data + " : " + status);
            window.location.href = "/widgets/" + data.widget.id;
        }, 'json')
        .done(function() { alert("second success"); })
        .fail(function() { alert("error"); })
        .always(function() { alert("finished"); });
	event.preventDefault();
    });
});
