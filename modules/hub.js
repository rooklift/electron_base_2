"use strict";

const {ipcRenderer} = require("electron");
const config_io = require("./config_io");

module.exports = {

	set: function(key, value) {

		config[key] = value;

		switch (key) {		// Any followup actions needed for individual keys... most commonly some redraw will be required when a setting changes.

		case "foo":
			alert("A setting change triggered this alert.");
			break;
		}

	},

	quit: function() {

		config.width = Math.floor(window.innerWidth * zoomfactor);
		config.height = Math.floor(window.innerHeight * zoomfactor);

		config_io.save();								// As long as we use the sync save, this will complete before we
		ipcRenderer.send("terminate");					// send "terminate". Not sure about results if that wasn't so.
	},

};
