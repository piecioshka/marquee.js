// run marquee
$(function () {
    function update_status(status) {
        $("#status").html('Status: <strong>' + status + '<\/strong>');
    }

    var buttons = $(".button");

    $("#stop").click(function (evt) {
        evt.preventDefault();

        $.each(buttons, function (i, button) {
            marquee.stop(button);
        });
        update_status("stop");
    });

    $("#run").click(function (evt) {
        evt.preventDefault();

        $.each(buttons, function (i, button) {
            marquee.stop(button);
            marquee.fly(button);
        });
        update_status("run");
    });

    $("#run").trigger("click");
});
