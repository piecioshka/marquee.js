var marquee;
marquee = (function ($) {
    "use strict";

    var TEXT_CONTAINER = ".button-inner";
    var TEXT_WRAPPER = TEXT_CONTAINER + " span";
    var ANIMATION_TIME = 2000;

    function get_anty_mode(mode) {
        return (mode === "+") ? "-" : "+";
    }

    /**
     * Flying letter in container from LEFT to RIGHT
     *
     * Example HTML hierarchy:
     * <pre>
     *
     * <div class="button">
     *     <div class="button-inner">
     *         <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
     *     </div>
     * </div>
     *
     * </pre>
     * @param {Node} button HTMLElement of button
     * @param {String} mode Mode for animation direction. Ex. '-' / '+'
     */
    function fly(button, mode) {
        mode = mode || "-";
        var antymode = get_anty_mode(mode),
            default_left,
            $button = jQuery(button),
            $button_inner = $(TEXT_CONTAINER, $button),
            $button_inner_span = $(TEXT_WRAPPER, $button);

        if ($button.attr("default_left") === undefined) {
            default_left = parseInt($button_inner.css("left"), 10);
            $button.attr("default_left", default_left);
        } else {
            default_left = $button.attr("default_left");
        }

        $button_inner.animate({
            left: mode + "=" +(function (b, s) {
                return s.width() - b.width() + (default_left * 2);
            }($button, $button_inner_span)) + "px"
        }, ANIMATION_TIME, function () {
            setTimeout(function () {
                fly($button, antymode);
            }, ANIMATION_TIME / 2);
        });
    }

    /**
     * Stop flying text in button
     * @param {Node} button
     */
    function stop(button) {
        var $button = jQuery(button),
            $button_inner = $(TEXT_CONTAINER, $button);

        $button_inner.stop(true, false).css({
            left: $button.attr("default_left") + "px"
        });
    }

    // public API
    return {
        fly: fly,
        stop: stop
    };
}(jQuery));
