requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app',
        minicolors : 'jqueryminicolors/minicolors',
        jasmine: 'jasmine-2.3.4/jasmine',
        jasminehtml: 'jasmine-2.3.4/jasmine-html',
        boot: 'jasmine-2.3.4/boot',
        spec: '../spec'
    },
    
    shim: {
        'pinchzoom': {
            deps: ['jquery'],
            exports: 'pinchzoom'
        },
        'jquerypep': {
            deps: ['jquery'],
            exports: 'jquerypep'
        },
        'minicolors': {
            deps: ['jquery'],
            exports: 'minicolors'
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasminehtml': {
            deps: ['jasmine'],
            exports: 'jasminehtml'
        },
        'boot': {
            deps: ['jasmine','jasminehtml'],
            exports: 'boot'
        }
    }
});

// Start the main app logic.
requirejs(['jquery', 'app/config', 'app/views/home-view', 'app/views/list-view', 'app/views/filters-view', 'app/models/grid', 'jquery-mobile/jquery.mobile-1.4.5.min'],
function   ($, DG_Conf, HomeView, ListView, FiltersView, Grid, jquerymobile) {

    document.addEventListener('deviceready',app_init,false);
    document.addEventListener("backbutton", onBackKeyDown, false);

    $(document).ready(function(){
        if (DG_Conf.mode === 'web') {
           app_init();
        }
        if (DG_Conf.testmode) {
            load_tests();
        }
        if (DG_Conf.debugmode) {//weinre debuging
    //        var s = document.createElement("script");
    //        s.type = "text/javascript";
    //        s.src = DG_Conf.debughost + "/target/target-script-min.js#" + DG_Conf.debugid;
    //        console.log(s.src);
    //        $("head").append(s);
        }
    });

    function app_init() {
        'use strict';
        getCurrentGrid().fetch({
            success: function(grid, response, options) {
                load_views(grid);
            },
            error : function (grid, response, options) {
                load_views(new Grid({ id: 1 }));
            }
        });
        if (DG_Conf.mode !== 'web') {
            keepscreenon.enable();//Keep Screen Awake.
        }
    }

    function load_views(grid) {
        new HomeView({show_loading_graphic:true, model: grid});
        new ListView({model: grid});
        new FiltersView({model: grid});
    }

    function onBackKeyDown() {
        if ($('.ui-panel-open').length) {
            $(".ui-panel-open").panel( "close" );
        } else {
            navigator.app.exitApp();
        }
    }

    function load_tests() {

        require(['spec/GridSettingsSpec'], function (GSS) {
            window.onload();
        });

        var s = document.createElement("link");
        s.rel = "stylesheet";
        s.href = "lib/jasmine-2.3.4/jasmine.css";
        $("head").append(s);
    }
    
    function getCurrentGrid() {
        return new Grid({ id: 1 });
    }
});
