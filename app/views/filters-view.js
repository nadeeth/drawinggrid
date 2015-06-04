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
                            
                            //this.save_filtered_image($('#active-grid-img').attr('src'));
                            var grid = JSON.parse(localStorage.getItem('current_grid'));
                            grid.filter = true;
                            localStorage.setItem('current_grid', JSON.stringify(grid));
                            
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

                            function gotFS(fileSystem) {
                                fileSystem.root.getFile("grid_filtered.txt", {create: true, exclusive: false}, gotFileEntry, fail);
                            }

                            function gotFileEntry(fileEntry) {
                                fileEntry.createWriter(gotFileWriter, fail);
                            }

                            function gotFileWriter(writer) {
                                writer.write($('#active-grid-img').attr('src'));
                            }

                            function fail(error) {
                                alert('write-error - '+error.code);
                            }
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
        },
        
        save_filtered_image: function(img) {alert('cxhi');//TODO: refactor
        
            
        }
    });
})(jQuery);