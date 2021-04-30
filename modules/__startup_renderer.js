"use strict";

const {ipcRenderer} = require("electron");

const config_io = require("./config_io");
const stringify = require("./stringify");

config_io.load();
config_io.create_if_needed();

// --------------------------------------------------------
// Globals, only want a few...

global.alert = (msg) => {
	ipcRenderer.send("alert", stringify(msg));
};

global.config = config_io.config;
global.hub = require("./hub").new_hub();

// --------------------------------------------------------
// Menu handlers...

ipcRenderer.on("foo", (event, msg) => {
	hub.foo(msg);
});
