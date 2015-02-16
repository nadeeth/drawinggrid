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


        },

        render: function () {
			
        },

        // Add grid
        saveGrid: function (e) {
			
			//app.list.create("{a:b}");
			new app.HomeView();
        },

        // Add all items in the list
        addAll: function () {
            this.$list.html('');
            app.list.each(this.addOne, this);
        }

    });
})(jQuery);