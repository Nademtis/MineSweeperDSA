"use strict"
export default class View {

    controller;

    constructor(controller) {
        this.controller = controller;

    }
    sayHello(){
        console.log("hi from view");
    }
}