var app = app || {};

(function ($) {
    'use strict';

    app.FiltersView = Backbone.View.extend({

        el: '#filters-section',

        // Change Filters
        events: {
//            'click #dg-filter':'changeFilter'
        },

        // Bind to the relevant events at intialization 
        initialize: function () {
            $('.dg-filter').click(function(){
                var grid = JSON.parse(localStorage.getItem('current_grid'));
                grid.filter = $(this).data('dg-filter');
                localStorage.setItem('current_grid', JSON.stringify(grid));
                new app.HomeView();
                location.reload();
            });
        },

        changeFilter: function () {			

        }
    });
})(jQuery);