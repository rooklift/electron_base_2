"use strict";

exports.NewHub = function() {
	let hub = Object.create(null);
	Object.assign(hub, hub_props);
	return hub;
};

let hub_props = {

	foo: function() {
		console.log("foo!");
	},

};
