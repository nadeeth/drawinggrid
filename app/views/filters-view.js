var app = app || {};

(function ($) {
    'use strict';

    app.FiltersView = Backbone.View.extend({

        el: '#filters-section',

        // Events
        events: {
            
        },

        // Bind to the relevant events at intialization 
        initialize: function () {
            
            $('.dg-filter').click(function(){
                
                //VintageJS
                if ($(this).data('dg-filter') === 'filter-sepia') {
                    var img = document.getElementById('active-grid-img');
                    var options = {
                        onError: function() {
                            alert('Filter Error.');
                        },
                        onStop: function() {
                            var grid = JSON.parse(localStorage.getItem('current_grid'));
                            grid.filter = $('#active-grid-img').attr('src');
                            localStorage.setItem('current_grid', JSON.stringify(grid));
                        }
                    };
                    var effect = {
                        vignette: 0.6,
                        sepia: true
                    };
                    new VintageJS(img, options, effect);
                }
                
                if (!$(this).data('dg-filter')) {
                    var grid = JSON.parse(localStorage.getItem('current_grid'));
                    grid.filter = '';
                    localStorage.setItem('current_grid', JSON.stringify(grid));
                }


                new app.HomeView();
            });
        }
    });
})(jQuery);