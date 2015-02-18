var app = app || {};

(function () {
	'use strict';

	var List = Backbone.Collection.extend({

		// Reference to this collection's model
		model: app.Grid,

		// Save all the grids under the `"grids"` namespace
		localStorage: new Backbone.LocalStorage('grids-list'),
		
		// Next order number for new grid items
        nextOrder: function () {
            if (!this.length) {
                return 1;
            }
            return this.last().get('order') + 1;
        }
	});

	// Create our global collection of **Items**.
	app.list = new List();
})();