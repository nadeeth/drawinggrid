!function($) {

    $.fn.pinchZoom = function(options) {

        var width = $(this).width();
        var prev_distance = 0;

        $(this).on("touchmove", function (event) {

            //check for two fingers touching
            if (event.originalEvent.touches.length === 2) {

                //Get the cordinates for two touch points                
                var xa = event.originalEvent.touches[0].pageX;
                var ya = event.originalEvent.touches[0].pageY;
                var xb = event.originalEvent.touches[1].pageX;
                var yb = event.originalEvent.touches[1].pageY;

                //Distance between two touches
                var cur_distance = Math.sqrt(((xa - xb)*(xa - xb)) + ((ya-yb)*(ya-yb)));

                if (prev_distance) {

                    if (cur_distance > prev_distance) {//Zoom In
                        width += 10;
                    }
                    if (cur_distance < prev_distance) {//Zoom Out
                        width -= 10;
                    }

                    //Keep the higth auto to preserve the original aspect ratio
                    $(this).css('background-size', 'auto ' + width + 'px');
                }

                prev_distance = cur_distance;
            }
        });
        
        $(this).on('touchend.dbg', function() {
            if (options.done) {
              options.done();
            }
            //$(this).off('touchend.dbg');
        });
    };
}(jQuery);