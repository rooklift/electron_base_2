"use strict";

const {ipcRenderer} = require("electron");
const {defaults_classified} = require("./config_io");

exports.new_hub = function() {
	let hub = Object.create(hub_props);
	return hub;
};

let hub_props = {

	set: function(key, value) {

		config[key] = value;

		switch (key) {		// Any followup actions needed for individual keys... most commonly some redraw will be required when a setting changes.

		case "foo":
			alert("A setting change triggered this alert.");
			break;
		}

	},

	quit: function() {
		save_config();									// As long as we use the sync save, this will complete before we
		ipcRenderer.send("terminate");					// send "terminate". Not sure about results if that wasn't so.
	},

};
