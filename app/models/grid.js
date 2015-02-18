/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = app || {};

(function () {
	'use strict';

	app.Grid = Backbone.Model.extend({

		// Default attributes
		defaults: {
			//title: 'Default',
			rows: 4,
			cols: 3,
			img: '',
			color: '#FF0000'
		}
	});
})();
