var marquee;
marquee = (function () {
    "use strict";

    var default_left = null;

    function get_anty_mode(mode) {
        if (mode === "+") {
            return "-";
        } else {
            return "+";
        }
    }

    function fly(button, mode) {
        mode = mode || "-";
        var antymode = get_anty_mode(mode);

        button = jQuery(button);
        var button_inner = $(".button-inner", button);
        var button_inner_span = $(".button-inner span", button);

        if (default_left === null) {
            default_left = parseInt(button_inner.css("left"), 10);
        }

        button.attr("default_left", default_left);

        button_inner.animate({
            left: mode + "=" +(function (b, s) {
                return s.width() - b.width() + (default_left * 2);
            }(button, button_inner_span)) + "px"
        }, 2000, function () {
            setTimeout(function () {
                fly(button, antymode);
            }, 1000);
        });
    }

    function stop(buttons) {
        for (var i = 0; i < buttons.length; ++i) {
            var button = jQuery(buttons[i]),
                button_inner = $(".button-inner", button);

            button_inner.stop(true, false).css({
                left: button.attr("default_left") + "px"
            });
        }
    }

    // public API
    return {
        init: function () {
            var buttons = $(".button");

            $("#stop").click(function (evt) {
                stop(buttons);
                marquee.update_status("stop");
                evt.preventDefault();
            });

            $("#run").click(function (evt) {
                fly(buttons);
                marquee.update_status("run");
                evt.preventDefault();
            });

            $("#run").trigger("click");
        },
        update_status: function (status) {
            $("#status").html('Status: <strong>' + status + '<\/strong>');
        }
    };
}());

// run marquee
window.addEventListener("load", marquee.init);
