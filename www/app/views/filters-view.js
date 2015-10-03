var app = app || {};

(function ($) {
    'use strict';

    app.FiltersView = Backbone.View.extend({//TODO: refactor to improve the code quality

        el: '#filters-section',

        // Events
        events: {
            
        },

        // Bind to the relevant events at intialization 
        initialize: function () {
            
            $('.dg-filter').click(function(){
                
                var button = $(this);
                var label = button.html();
                    
                //VintageJS                   
                var img = document.getElementById('active-grid-img');
                if (img.src==='file:///android_asset/www/index.html') { return; }//Very very dirty.

                var options = {
                    onError: function() {
                        alert('Filter Error.');
                    },
                    onStop: function(img) {

                        var grid = JSON.parse(localStorage.getItem('current_grid'));
                        grid.filter = true;
                        localStorage.setItem('current_grid', JSON.stringify(grid));
                        
                        if (DG_Conf.mode === 'web') {
                            localStorage.setItem('filtered_image', $('#active-grid-img').attr('src'));
                        } else {
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
                        }

                        function gotFS(fileSystem) {
                            fileSystem.root.getFile("grid_filtered.txt", {create: true, exclusive: false}, gotFileEntry, fail);
                        }

                        function gotFileEntry(fileEntry) {
                            fileEntry.createWriter(gotFileWriter, fail);
                        }

                        function gotFileWriter(writer) {
                            writer.write($('#active-grid-img').attr('src'));
                            button.html(label);
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
                    button.html(label);
                    new app.HomeView();
                } else {
                    button.html(label + ' : Loading, please wait...');
                    setTimeout(function(){//TODO: use a promise or something
                        new VintageJS(img, options, vintagePresets[button.data('dg-filter')]);
                    }, 
                    100);
                }
            });
        }
    });
})(jQuery);