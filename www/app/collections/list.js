var app = app || {};

(function () {
	'use strict';

	var List = Backbone.Collection.extend({

		// Reference to this collection's model
		model: app.Grid,

		// Save all the grids under the `"grids"` namespace
		//localStorage: new Backbone.LocalStorage('grids-list'),

	});

	// Create our global collection of **Items**.
	app.list = new List();
})();