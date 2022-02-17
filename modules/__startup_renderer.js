"use strict";

const {ipcRenderer} = require("electron");
const querystring = require("querystring");

const config_io = require("./config_io");		// Creates global.config
const stringify = require("./stringify");

// ------------------------------------------------------------------------------------------------
// Globals, only want a few...

global.alert = (msg) => {
	ipcRenderer.send("alert", stringify(msg));
};

config_io.load();								// Populates global.config

global.zoomfactor = parseFloat(querystring.parse(global.location.search).zoomfactor);
global.hub = require("./hub")

// ------------------------------------------------------------------------------------------------
// Menu handlers...

ipcRenderer.on("set", (event, msg) => {
	for (let [key, value] of Object.entries(msg)) {
		hub.set(key, value);
	}
});

ipcRenderer.on("toggle", (event, msg) => {
	hub.set(msg, !config[msg]);
});

ipcRenderer.on("call", (event, msg) => {
	let fn;
	if (typeof msg === "string") {																		// msg is function name
		fn = hub[msg].bind(hub);
	} else if (typeof msg === "object" && typeof msg.fn === "string" && Array.isArray(msg.args)) {		// msg is object with fn and args
		fn = hub[msg.fn].bind(hub, ...msg.args);
	} else {
		console.log("Bad call, msg was...");
		console.log(msg);
	}
	fn();
});

// ------------------------------------------------------------------------------------------------

window.addEventListener("error", (event) => {
	alert("An uncaught exception happened in the renderer process. See the dev console for details. The app might now be in a bad state.");
}, {once: true});
