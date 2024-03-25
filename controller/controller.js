"use strict"

import Model from "../model/model.js"
import View from "../view/view.js"

export default class Controller {
    constructor() {
        this.model = new Model()
        this.view = new View(this)
    }
    init() {
        //inital method. called by main.js

        console.log("hi from controller");
        this.view.sayHello()
        this.model.sayHello()
    }

}