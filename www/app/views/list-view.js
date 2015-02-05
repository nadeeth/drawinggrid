var app = app || {};

(function ($) {
    'use strict';

    app.ListView = Backbone.View.extend({

        el: '#list-section',

        // Create New Items
        events: {
            
        },

        // Bind to the relevant events at intialization 
        initialize: function () {


        },

        render: function () {

        },

        // Add a single list item
        addOne: function (item) {

        },

        // Add all items in the list
        addAll: function () {
            this.$list.html('');
            app.list.each(this.addOne, this);
        }

    });
})(jQuery);