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
            
            //localStorage.removeItem('current_grid');//Debug
            
            //Retrieve the saved current grid
            var grid = localStorage.getItem('current_grid');
			grid = grid ? new app.Grid(JSON.parse(grid)) : new app.Grid;            
			this.draw_grid(grid);
            
            //Bind the pinch zoom, drag initilizations
            $(this.el).find("img").pep({
                shouldEase: false,
                useCSSTranslation: false,
                //debug: true,
                stop: function() {
                    var grid = JSON.parse(localStorage.getItem('current_grid'));
                    grid.position_top = $('#active-grid-img').css('top');
                    grid.position_left = $('#active-grid-img').css('left');
                    localStorage.setItem('current_grid', JSON.stringify(grid));
                }
            });

			$(this.el).find("img").pinchzoom({
                done: function() {
                    var img_width = $('#active-grid-img').css('width');
                    var grid = JSON.parse(localStorage.getItem('current_grid'));
                    grid.img_width = img_width;
                    localStorage.setItem('current_grid', JSON.stringify(grid));
                },
                width: grid.get("img_width")
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
            
            if (!grid.get('filter')) {
                $(this.el).find("img").attr("src", grid.get('img'));
            } else {
                this.get_filtered_image();
            }
            //$(this.el).find("img").attr("src", grid.get('img'));
            
            $(this.el).find("img").css("left",grid.get("position_left"));
            $(this.el).find("img").css("top",grid.get("position_top"));
			$(this.el).find("img").css("width",grid.get("img_width")+" !important");
            //$(this.el).find("img").css("height",'auto');
		},
        
        get_filtered_image: function() {
            
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

            function gotFS(fileSystem) {
                fileSystem.root.getFile("grid_filtered.txt", null, gotFileEntry, fail);
            }

            function gotFileEntry(fileEntry) {
                fileEntry.file(gotFile, fail);
            }

            function gotFile(file){
                readAsText(file);
            }

            function readAsText(file) {
                var reader = new FileReader();
                reader.onloadend = function(evt) {
                    if (evt.target.result) {
                        document.getElementById("active-grid-img").src = evt.target.result;
                    }
                };
                reader.readAsText(file);
            }

            function fail(error) {
                alert(error.code);
            }
        }
        
    });
})(jQuery);