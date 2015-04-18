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
            
            //Retrieve the saved current grid
            var grid = localStorage.getItem('current_grid');
			grid = grid ? new app.Grid(JSON.parse(grid)) : new app.Grid;            
			this.draw_grid(grid);
            
            //Bind the pinch zoom, drag initilizations
            $(this.el).find("img").pep({
                shouldEase: false,
                useCSSTranslation: false,
                stop: function() {
                    var grid = JSON.parse(localStorage.getItem('current_grid'));
                    grid.position_top = $('#active-grid-img').css('top');
                    grid.position_left = $('#active-grid-img').css('left');
                    localStorage.setItem('current_grid', JSON.stringify(grid));
                }
            });

			$(this.el).pinchzoom({
                done: function() {
                    var backgroundSize = $('#active-grid').css('background-size');
                    var grid = JSON.parse(localStorage.getItem('current_grid'));
                    grid.img_size = backgroundSize;
                    localStorage.setItem('current_grid', JSON.stringify(grid));
                },
                width: grid.get("img_size")
            });
        },
		
		//Draw grid
		draw_grid: function(grid) {
			
			var grid_html = "";
			for (var i=0; i<grid.get("rows"); i++) {
				grid_html += "<tr>";
				for (var j=0; j<grid.get("cols"); j++) {
					grid_html += "<td></td>";
				}
				grid_html += "</tr>";
			}
			
			$(this.el).find(".grid").html(grid_html).find("td").css("border","1px solid "+grid.get("color"));
            
			$(this.el).find("img").attr("src",grid.get('img'));
			$(this.el).find("img").css("left",grid.get("position_left"));
            $(this.el).find("img").css("top",grid.get("position_top"));
			//$(this.el).css("background-size",grid.get("img_size"));
		}
    });
})(jQuery);