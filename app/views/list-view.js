var app = app || {};

(function ($) {
    'use strict';

    app.ListView = Backbone.View.extend({

        el: '#list-section',

        // Create New Items
        events: {
            'click #save_grid':'saveGrid',
            'click #btn_photo_camera':'getPhotoCamera',
            'click #btn_photo_file':'getPhotoFile'
        },

        // Bind to the relevant events at intialization 
        initialize: function () {
			this.renderCurrentGrid();
			//{reset: true} - To suppresses 'add' events for intial loading 
			app.list.fetch({reset: true});
        },

        renderCurrentGrid: function () {
			
			var grid = localStorage.getItem('current_grid');
			var picker_color = 'ff0000';
			
			if (grid) {
				grid = new app.Grid(JSON.parse(grid));
				$("#rows").val(grid.get("rows"));
                $("#cols").val(grid.get("cols"));
                $("#img").val(grid.get("img"));
                $("#color_code").val(grid.get("color"));
                $("#image_preview").css("background-image","url('"+grid.get('img')+"')");
				picker_color = grid.get("color");
			}
			
			$('#color').minicolors({//Initialize the color picker
				theme: 'bootstrap',
				defaultValue: picker_color,
				change: function(hex, opacity) {
					$('#color_code').val(hex);
				}
			});
        },
		
		// Get the list of attributes for a new item
        getAttributes: function () {
            return {
                //title: $("#title").val().trim(),
                rows: $("#rows").val().trim(),
                cols: $("#cols").val().trim(),
                img: $("#img").val().trim(),
                color: $("#color_code").val().trim(),
                order: app.list.nextOrder()
            };
        },

        // Add grid
        saveGrid: function (e) {

            var grid = this.getAttributes();

            //TODO: remove later after the full list is enabled
            app.list.each(function(model) {
                model.destroy();
            });

            app.list.create(grid);
            this.setCurrentGrid(grid);
            new app.HomeView();
        },
		
        clearGridsList: function() {
            app.list.each(function(model) {
                model.destroy();
            });
        },

        setCurrentGrid: function(grid) {
            localStorage.setItem('current_grid', JSON.stringify(grid));
        },
        
        getCurrentGrid: function() {
                return JSON.parse(localStorage.getItem('current_grid'));
        },
        
        getPhotoFile: function() {
            navigator.camera.getPicture(
                function(uri){
                    $("#img").val(uri);
                    $("#image_preview").css("background-image", "url('"+uri+"')");
                }, 
                function(msg){
                    alert(msg);
                }, 
                { 
                    quality: 50, 
                    destinationType: navigator.camera.DestinationType.FILE_URI,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY 
                });
        },
        
        getPhotoCamera: function() {
            navigator.camera.getPicture(
                function(uri){
                    $("#img").val(uri);
                    $("#image_preview").css("background-image", "url('"+uri+"')");
                }, 
                function(msg){
                    alert(msg);
                }, 
                { 
                    quality: 50, 
                    destinationType: Camera.DestinationType.FILE_URI 
                }
            );
        }

        // Add all items in the list
//        addAll: function () {
//            this.$list.html('');
//            app.list.each(this.addOne, this);
//        }

    });
})(jQuery);