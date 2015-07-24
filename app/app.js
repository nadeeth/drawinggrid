var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

//$(function () {
//    'use strict';
//
//    //new app.AppView();
//});
var app_init = function() {
    $(function() {
		'use strict';
        $.slidebars();
		new app.HomeView({show_loading_graphic:true});
		new app.ListView();
        new app.FiltersView();
        keepscreenon.enable();//Keep Screen Awake.
    });
};
//$.slidebars();//Debug Mode