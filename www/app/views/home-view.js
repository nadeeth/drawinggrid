var app = app || {};

(function ($) {
    'use strict';

    app.HomeView = Backbone.View.extend({

        el: '#active-grid',

        // Create New Items
        events: {
            
        },

        // Bind to the relevant events at intialization 
        initialize: function () {
			this.draw_grid();
			$(this.el).backgroundDraggable();
			$(this.el).pinchZoom();
			//Bind the pinch zoom, drag initilizations to here
        },
		
		//Draw grid
		draw_grid: function(grid) {
			
			var grid = "";			
			for (var i=0; i<4; i++) {
				grid += "<tr>";
				for (var j=0; j<3; j++) {
					grid += "<td></td>";
				}
				grid += "</tr>";
			}
			$(this.el).find(".grid").html(grid);
			$(this.el).css("background-image","url('img/sample.jpg')");
			$(this.el).css("background-position","center center");
			$(this.el).css("background-size","cover");
		}
    });
})(jQuery);