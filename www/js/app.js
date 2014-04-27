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
        $.slidebars();
        $('.body').backgroundDraggable();
        $('.body').pinchZoom();
    });
})(jQuery);
