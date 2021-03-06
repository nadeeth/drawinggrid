define(["jquery","app/config","underscore","backbone","vintageJS/vintage","vintage.presets"], 
function($, DG_Conf, _, Backbone, VintageJS, vintagePresets) {

    'use strict';

    return Backbone.View.extend({

        el: '#filters-section',

        // Events
        events: {
            
        },

        // Bind to the relevant events at intialization 
        initialize: function () {
            
            var super_this = this;
            
            $('.dg-filter').click(function(){
                
                var button = $(this);
                var label = button.html();
                    
                var img = document.getElementById('active-grid-img');
                if (!img.src) { 
                    return;
                }

                var options = {
                    onError: function() {
                        alert('Filter Error.');
                    },
                    onStop: function(img) {

                        if (DG_Conf.mode === 'web') {
                            localStorage.setItem('filtered_image', $('#active-grid-img').prop('src'));
                        } else {
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
                        }
                        
                        super_this.model.save({filter: true});

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
                    
                    super_this.model.save({filter:""});
                    button.html(label);
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
});