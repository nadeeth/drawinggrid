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
                   
                var img = document.getElementById('active-grid-img');

                var options = {
                    onError: function() {
                        alert('Filter Error.');
                    },
                    onStop: function(img) {

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

                if (!$(this).data('dg-filter')) {
                    var grid = JSON.parse(localStorage.getItem('current_grid'));
                    grid.filter = '';
                    localStorage.setItem('current_grid', JSON.stringify(grid));
                } else {
                    new VintageJS(img, options, vintagePresets[$(this).data('dg-filter')]);
                }

                new app.HomeView();
            });
        }
    });
})(jQuery);