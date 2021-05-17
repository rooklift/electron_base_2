"use strict";

const {defaults_classified} = require("./config_io");

exports.new_hub = function() {
	let hub = Object.create(hub_props);
	return hub;
};

let hub_props = {

	set: function(key, value) {
		config[key] = value;
		save_config();
		this.take_followup_actions([key]);
	},

	take_followup_actions: function(keys) {

		if (Array.isArray(keys) === false) {
			throw "take_followup_actions(): bad call";
		}

		let hits = {};
		let classifiers = Object.keys(defaults_classified);

		for (let key of keys) {
			for (let cl of classifiers) {
				if (defaults_classified[cl][key] !== undefined) {
					hits[cl] = true;
				}
			}
		}

		if (hits.alerters) {
			alert("A setting change triggered this alert.");
		}

		// etc - most commonly some redraw will be required when a setting changes.
	},

};
