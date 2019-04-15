"use strict";
/*jslint vars:true, plusplus:true, forin:true*/
/*global Tablet, Script,  */
/* eslint indent: ["error", 4, { "outerIIFEBody": 1 }] */
//
// eyeLook_app.js
//
// Created by Zach Fox on 2018-12-07
// Copyright 2018 Zach Fox
//
// Distributed under the Apache License, Version 2.0
// See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

(function () { // BEGIN LOCAL_SCOPE
    // This is the message that's received from the UI JS that indicates that the UI is ready.
    function onEventBridgeReady() {
        ui.sendMessage({
            app: APP_NAME,
            method: "initializeUI",
            data: {
                combineChecked: combined
            }
        });
    }   
    
    
    function enableCustomEyeRotation() {
        MyAvatar.lookAtSnappingEnabled = false;
        MyAvatar.hasProceduralEyeFaceMovement = false;
        MyAvatar.hasProceduralBlinkFaceMovement = false;
    }


    function restoreAllJointData() {
        MyAvatar.lookAtSnappingEnabled = true;
        MyAvatar.hasProceduralEyeFaceMovement = true;
        MyAvatar.hasProceduralBlinkFaceMovement = true;

        MyAvatar.clearJointsData();

        for (var i = 0; i < jointInfo.length; i++) {
            delete jointInfo[i].customRotation;
        }
    }


    var jointInfo = [
        {
            "jointName": "LeftEye"
        },
        {
            "jointName": "RightEye"
        }
    ];
    function setupJointInfo() {
        for (var i = 0; i < jointInfo.length; i++) {
            jointInfo[i].jointIndex = MyAvatar.getJointIndex(jointInfo[i].jointName);
        }
    }


    // Returns a linearly scaled value based on `factor` and the other inputs
    function linearScale(factor, minInput, maxInput, minOutput, maxOutput) {
        return minOutput + (maxOutput - minOutput) *
        (factor - minInput) / (maxInput - minInput);
    }


    function setJointRotations() {
        for (var i = 0; i < jointInfo.length; i++) {
            MyAvatar.setJointRotation(jointInfo[i].jointIndex, jointInfo[i].customRotation);
        }
    }


    var MIN_X_ROT_DEG = -40;
    var MAX_X_ROT_DEG = 40;
    var MIN_Y_ROT_DEG = -40;
    var MAX_Y_ROT_DEG = 40;
    function updateEyePosition(data) {
        var eye = data.eye;
        var jointInfoIndex = (eye === "left" ? 0 : 1);
        var xPosFraction = data.xPosFraction;
        var yPosFraction = data.yPosFraction;

        var eyeXRotationDegrees = linearScale(yPosFraction, 0, 1, MIN_Y_ROT_DEG, MAX_Y_ROT_DEG);
        var eyeYRotationDegrees = -linearScale(xPosFraction, 0, 1, MIN_X_ROT_DEG, MAX_X_ROT_DEG);

        if (combined || eye === "both") {
            jointInfo.forEach(function(element) {
                element.customRotation = Quat.fromVec3Degrees({
                    "x": eyeXRotationDegrees,
                    "y": eyeYRotationDegrees,
                    "z": 0
                });
            });
        } else {
            jointInfo[jointInfoIndex].customRotation = Quat.fromVec3Degrees({
                "x": eyeXRotationDegrees,
                "y": eyeYRotationDegrees,
                "z": 0
            });
        }        

        setJointRotations();
    }

    var combined = false;
    function combineCheckboxClicked(checked) {
        combined = checked;

        if (combined) {
            jointInfo[1].customRotation = jointInfo[0].customRotation;
            
            setJointRotations();
        }
    }


    // Handle EventBridge messages from UI JavaScript.
    function onWebEventReceived(event) {
        if (event.app !== APP_NAME) {
            return;
        }

        switch (event.method) {
            case "eventBridgeReady":
                onEventBridgeReady();
                break;


            case "updateEyePosition":
                updateEyePosition(event.data);
                break;


            case "presetButtonClicked":
                combined = false;
                updateEyePosition(event.data);
                break;


            case "combineCheckboxClicked":
                combineCheckboxClicked(event.data);
                break;

            default:
                console.log("Unrecognized event method supplied to App JS: " + event.method);
                break;
        }
    }


    var AppUi = Script.require('./modules/appUi.js');
    var APP_NAME = "EYELOOK";
    var ui;
    function startup() {
        ui = new AppUi({
            buttonName: APP_NAME,
            home: Script.resolvePath("./ui/eyeLook_ui.html"),
            onMessage: onWebEventReceived,
            onOpened: enableCustomEyeRotation,
            onClosed: restoreAllJointData
        });

        setupJointInfo();
    }
    startup();
    
    function shutdown() {
        if (ui.isOpen) {
            ui.onClosed();
        }
    }
    Script.scriptEnding.connect(shutdown);
}()); // END LOCAL_SCOPE
