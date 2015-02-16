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
			
			var grid = localStorage.getItem('current_grid');
			grid = grid ? new app.Grid(JSON.parse(grid)) : new app.Grid;
			
			var grid_html = "";			
			for (var i=0; i<grid.get("rows"); i++) {
				grid_html += "<tr>";
				for (var j=0; j<grid.get("cols"); j++) {
					grid_html += "<td></td>";
				}
				grid_html += "</tr>";
			}
			
			$(this.el).find(".grid").html(grid_html);
			$(this.el).css("background-image","url('img/sample.jpg')");
			$(this.el).css("background-position","center center");
			$(this.el).css("background-size","cover");
		}
    });
})(jQuery);