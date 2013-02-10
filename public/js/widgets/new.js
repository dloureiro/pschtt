$(document).ready(function() {
    $('#myForm').submit(function(event) {
        event.preventDefault();
        var inputData = $('#myForm').serialize();
        var url = $('#myForm').attr( 'action' );
        $.post(url, inputData,
        function(data, status) {
            alert(data + " : " + status);
            window.location.href = "/widgets/" + data.widget.id + "/show";
        }, 'json');
    });
});