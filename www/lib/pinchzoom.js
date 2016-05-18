!function($) {

    $.fn.pinchzoom = function(options) {

        var options = options ? options : {};

        options.min_width = options.min_width ? options.min_width : '50';
        
        if (options.width) {
            var width = options.width;
        } else {
            var width = (this).css('width');
        }

        if (width === 'auto' || !width) {
            var img = new Image;
            img.src = $(this).attr('src');
            width = img.width;
        }
        
        width = parseInt(width);
                
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
                        width += options.step ? options.step : 10;
                    }
                    if ((cur_distance < prev_distance) && (width > options.min_width)) {//Zoom Out
                        width -= options.step ? options.step : 10;
                    }

                    //Keep the higth auto to preserve the original aspect ratio
                    $(this).css('width', width + 'px');
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