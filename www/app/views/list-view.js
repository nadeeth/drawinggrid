var app = app || {};

(function ($) {
    'use strict';

    app.ListView = Backbone.View.extend({

        el: '#list-section',

        // Create New Items
        events: {
            'click #save_grid':'saveGrid'
        },

        // Bind to the relevant events at intialization 
        initialize: function () {
			//{reset: true} - To suppresses 'add' events for intial loading 
			app.list.fetch({reset: true});
        },

        render: function () {
			
        },
		
		// Get the list of attributes for a new item
        getAttributes: function () {
            return {
                //title: $("#title").val().trim(),
                rows: $("#rows").val().trim(),
                cols: $("#cols").val().trim(),
                img: $("#img").val().trim(),
                color: $("#color").val().trim(),
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
        }

        // Add all items in the list
//        addAll: function () {
//            this.$list.html('');
//            app.list.each(this.addOne, this);
//        }

    });
})(jQuery);