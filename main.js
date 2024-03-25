"use strict"

import Controller from "./controller/controller.js";

window.addEventListener("load", start);

const controller = new Controller()
function start() {
    controller.init()
}
