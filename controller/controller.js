"use strict"

import Model from "../model/model.js"
import View from "../view/view.js"

export default class Controller {
    constructor() {
        this.model = new Model(30,16,99)
        this.view = new View(this)
    }
    init() {
        
        this.model.initGrid();
        
    }

}