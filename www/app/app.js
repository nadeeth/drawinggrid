var app = app || {};
var ENTER_KEY = 13;
var ESC_KEY = 27;

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
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = DG_Conf.debughost + "/target/target-script-min.js#" + DG_Conf.debugid;
        $("head").append(s);
    }
});

function app_init() {
    'use strict';
    $.slidebars();
    new app.HomeView({show_loading_graphic:true});
    new app.ListView();
    new app.FiltersView();
    if (DG_Conf.mode !== 'web') {
        keepscreenon.enable();//Keep Screen Awake.
    }
}

function onBackKeyDown() {
    if ($('.sb-active').length) {
        $('.sb-close').click();
    } else {
        navigator.app.exitApp();
    }
}

function load_tests() {
    var jasmine_files = [
        //Jasmine Library
        'lib/jasmine-2.3.4/jasmine.js',
        'lib/jasmine-2.3.4/jasmine-html.js',
        'lib/jasmine-2.3.4/boot.js',
        //Source files
        'src/Player.js',
        'src/Song.js',
        //Spec files
        'spec/SpecHelper.js',
        'spec/GridSettingsSpec.js'
    ];
    for (var i=0; i < jasmine_files.length; i++) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = jasmine_files[i];
        $("head").append(s);
    }
    var s = document.createElement("link");
    s.rel = "stylesheet";
    s.href = "lib/jasmine-2.3.4/jasmine.css";
    $("head").append(s);
}
