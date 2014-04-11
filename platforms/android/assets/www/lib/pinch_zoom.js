!function($) {
    $.fn.pinchZoom = function() {
        var tracks = [];
        var prev_distance = 0;
        $(this).on("touchmove", function (event) {
            
            //only run code if the user has two fingers touching
            if (event.originalEvent.touches.length === 2) {

                //track the touches, I'm setting each touch as an array inside the tracks array
                //each touch array contains an X and Y coordinate
                
                var xa = event.originalEvent.touches[0].pageX;
                var ya = event.originalEvent.touches[0].pageY;
                var xb = event.originalEvent.touches[1].pageX;
                var yb = event.originalEvent.touches[1].pageY;
                
                var cur_distance = Math.sqrt(((xa - xb)*(xa - xb)) + ((ya-yb)*(ya-yb)));
                
                if (prev_distance) {
                    if (cur_distance > prev_distance) {
                        image_width = image_width + 10;
                    }
                    if (cur_distance < prev_distance) {
                        image_width = image_width - 10;
                    }
                    
                    $(this).css('background-size', 'auto ' + image_width + 'px');
                    tracks.push([ [event.originalEvent.touches[0].pageX, event.originalEvent.touches[0].pageY], [event.originalEvent.touches[1].pageX, event.originalEvent.touches[1].pageY] ]);
                }
                
                prev_distance = cur_distance;
            }
        }).on("touchstart", function () {
            //start-over
            tracks = [];
        }).on("touchend", function () {
//            alert(JSON.stringify(tracks));
            //now you can decide the scale that the user chose
            //take the track points that are the closest and determine the difference between them and the points that are the farthest away from each other
        });
    }
}(jQuery);