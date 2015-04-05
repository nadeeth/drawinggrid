!function($) {

    $.fn.pinchzoom = function(options) {

        var options = options ? options : {};

        options.min_width = options.min_width ? options.min_width : '50';
        var size = (this).css('background-size').split(' ');
        var width = size[1];

        if (width === 'auto') {
            var img = new Image;
            img.src = $(this).css('background-image').replace(/url\(|\)$/ig, "");
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
                        width += 10;
                    }
                    if ((cur_distance < prev_distance) && (width > options.min_width)) {//Zoom Out
                        width -= 10;
                    }

                    //Keep the higth auto to preserve the original aspect ratio
                    $(this).css('background-size', width + 'px auto');
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