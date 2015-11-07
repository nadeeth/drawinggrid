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
        },

        renderCurrentGrid: function () {
			
            var picker_color = 'ff0000';

            $("#rows").val(this.model.get("rows"));
            $("#cols").val(this.model.get("cols"));
            $("#img").val(this.model.get("img"));
            $("#color_code").val(this.model.get("color"));
            $("#image_preview").css("background-image","url('"+this.model.get('img')+"')");
            $("#rotation").val(this.model.get("rotation"));
            this.rotatePreview(this.model.get("rotation"));
            picker_color = this.model.get("color");
			
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
                rotation: $("#rotation").val().trim()
            };
        },

        // Add grid
        saveGrid: function (e) {

            var grid = this.getAttributes();
            this.setCurrentGrid(grid);
            //new app.HomeView();
        },

        setCurrentGrid: function(grid) {

            var model = {
                rows: grid.rows,
                cols: grid.cols,
                color: grid.color
            };

            //Reset the filter, size and position if the image is new
            if (this.model.get("img") !== grid.img) {
                model.filter = false;
                model.img_width = 'auto';
                model.position_top = "0";
                model.position_left = "0";
            }

            model.img = grid.img;                
            model.rotation = grid.rotation;                    
            this.model.save(model);
        },
        
        clearGrid: function() {
            var r = confirm("Are you sure? This will clear the current saved grid.");
            if (r === true) {
                this.model.destroy(); 
                this.renderCurrentGrid();
                $("#active-grid-img").attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");//Reset Image to 1x1px transparent gif
            }            
        },
        
        getPhotoFile: function() {
            navigator.camera.getPicture(
                this.loadNewPhoto, 
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
                this.loadNewPhoto, 
                function(msg){
                    //alert(msg);
                }, 
                { 
                    quality: 50, 
                    destinationType: Camera.DestinationType.FILE_URI 
                }
            );
        },
        
        loadNewPhoto : function(uri){
            $("#img").val(uri);
            $("#image_preview").css({  
                "background-image": "url('"+uri+"')",
                '-webkit-transform': 'none',//Safari 3.1+, Chrome  
                '-moz-transform': 'none',//Firefox 3.5-15  
                '-ms-transform': 'none',//IE9+  
                '-o-transform': 'none',//Opera 10.5-12.00  
                'transform': 'none'//Firefox 16+, Opera 12.50+
            });
            $("#rotation").val(0);
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

    });
})(jQuery);