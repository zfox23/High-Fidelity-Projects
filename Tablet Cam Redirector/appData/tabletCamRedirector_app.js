"use strict";
/*jslint vars:true, plusplus:true, forin:true*/
/*global Tablet, Script,  */
/* eslint indent: ["error", 4, { "outerIIFEBody": 1 }] */
//
// tabletCamRedirector_app.js
//
// Created by Zach Fox on 2019-04-24
// Copyright 2019 High Fidelity
//
// Distributed under the Apache License, Version 2.0
// See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

(function () { // BEGIN LOCAL_SCOPE
    var AppUi = Script.require('appUi');
    var APP_NAME = "CAMERA";
    var ui;
    function startup() {
        ui = new AppUi({
            buttonName: APP_NAME,
            graphicsDirectory: Script.resolvePath("appIcons/"),
            home: Script.resolvePath("./ui/tabletCamRedirector_ui.html")
        });
    }
    startup();
}()); // END LOCAL_SCOPE
