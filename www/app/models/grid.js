define(["jquery","underscore","backbone","backbone.localStorage"], function($, _, Backbone, LocalStorage) {

    'use strict';

    return Backbone.Model.extend({

        localStorage: new Store("settings"),

        // Default attributes
        defaults: {
            //title: 'Default',
            rows: 4,
            cols: 3,
            square: 0,
            img: '',
            img_width: 'auto',
            color: '#FF0000',
            position_top: 0,
            position_left: 0,
            rotation: 0,
            filter: ''
        }
    });
});
