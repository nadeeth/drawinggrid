var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

//$(function () {
//    'use strict';
//
//    //new app.AppView();
//});
(function($) {
    $(function() {
		'use strict';
        $.slidebars();
		new app.HomeView();
		new app.ListView();
        
        //Control screen sleep
//        var onDeviceReady = function(){
//            alert('hi');
//            alert(keepscreenon);
//            keepscreenon.enable();
//        };
//        document.addEventListener('deviceready', onDeviceReady, false);
    });
})(jQuery);
