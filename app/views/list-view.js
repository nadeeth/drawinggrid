var app = app || {};

(function ($) {
    'use strict';

    app.ListView = Backbone.View.extend({

        el: '#list-section',

        // Create New Items
        events: {
            'click #save_grid':'saveGrid',
            'click #btn_photo_camera':'getPhotoCamera',
            'click #btn_photo_file':'getPhotoFile',
            'click #btn_rotate_img':'rotateImg',
            'click #clear_grid':'clearGrid'
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
                $("#rotation").val(grid.get("rotation"));
                this.rotatePreview(grid.get("rotation"));
				picker_color = grid.get("color");
			} else {
                $("#rows").val('');
                $("#cols").val('');
                $("#img").val('');
                $("#color_code").val('');
                $("#image_preview").css("background-image","url('')");
                $("#rotation").val('0');
				picker_color = '';
            }
			
            //$("#color").mcpicker();
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
                //img: 'img/sample.jpg',
                color: $("#color_code").val().trim(),
                //filter: '',
                rotation: $("#rotation").val().trim(),
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
            var current_grid = localStorage.getItem('current_grid');
            if (current_grid) {
                current_grid = JSON.parse(current_grid);
                current_grid.rows = grid.rows;
                current_grid.cols = grid.cols;
                current_grid.img = grid.img;
                current_grid.color = grid.color;
                current_grid.order = grid.order;
                //current_grid.filter = '';
                current_grid.rotation = grid.rotation;
                localStorage.setItem('current_grid', JSON.stringify(current_grid));
            } else {
                localStorage.setItem('current_grid', JSON.stringify(grid));
            }
        },
        
        clearGrid: function() {
            var r = confirm("Are you sure? This will clear the current saved grid.");
            if (r === true) {
                localStorage.removeItem('current_grid');
                new app.HomeView();
                this.renderCurrentGrid();
            }            
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
                    //alert(msg);
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
                    //alert(msg);
                }, 
                { 
                    quality: 50, 
                    destinationType: Camera.DestinationType.FILE_URI 
                }
            );
        },
        
        rotateImg: function() {
            
            var now = parseInt($('#rotation').val());
            if (isNaN(now)) {
                now = 90;
            } else if (now === 270) {
                now = 0;
            } else {
                now = now + 90;
            }
            
            $('#rotation').val(now);
            
            this.rotatePreview(now);
        },
        
        rotatePreview: function(rotation) {
            
            $("#image_preview").css({  
                '-webkit-transform': 'rotate(' + rotation + 'deg)',  //Safari 3.1+, Chrome  
                '-moz-transform': 'rotate(' + rotation + 'deg)',     //Firefox 3.5-15  
                '-ms-transform': 'rotate(' + rotation + 'deg)',      //IE9+  
                '-o-transform': 'rotate(' + rotation + 'deg)',       //Opera 10.5-12.00  
                'transform': 'rotate(' + rotation + 'deg)'          //Firefox 16+, Opera 12.50+
            });
        }

        // Add all items in the list
//        addAll: function () {
//            this.$list.html('');
//            app.list.each(this.addOne, this);
//        }

    });
})(jQuery);