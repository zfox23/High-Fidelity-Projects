//
//  eyeLook_ui.js
//
//  Created by Zach Fox on 2019-04-14
//  Copyright 2018 Zach Fox
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html

/* globals document setTimeout clearTimeout */

// Emit an event specific to the App JS over the EventBridge.
var APP_NAME = "EYELOOK";
function emitAppSpecificEvent(method, data) {
    var event = {
        app: APP_NAME,
        method: method,
        data: data
    };
    EventBridge.emitWebEvent(JSON.stringify(event));
}


var currentX = {};
var currentY = {};
var initialX = {};
var initialY = {};
var xOffset = {};
var yOffset = {};
function setupDragging() {
    var dragElements = [];
    dragElements.push(document.getElementById("leftEyePosition"));
    dragElements.push(document.getElementById("rightEyePosition"));

    var containerElements = [];
    containerElements.push(document.getElementById("leftEyeController"));
    containerElements.push(document.getElementById("rightEyeController"));

    var activeElement = false;

    containerElements.forEach(function(element) {
        element.addEventListener("touchstart", dragStart, false);
        element.addEventListener("touchend", dragEnd, false);
        element.addEventListener("touchmove", drag, false);
    
        element.addEventListener("mousedown", dragStart, false);
        element.addEventListener("mouseup", dragEnd, false);
        element.addEventListener("mousemove", drag, false);
    });

    function dragStart(e) {
        if (dragElements.indexOf(e.target) > -1) {
            activeElement = e.target;

            if (e.type === "touchstart") {
                initialX[activeElement.id] = e.touches[0].clientX - (xOffset[activeElement.id] || 0);
                initialY[activeElement.id] = e.touches[0].clientY - (yOffset[activeElement.id] || 0);
            } else {
                initialX[activeElement.id] = e.clientX - (xOffset[activeElement.id] || 0);
                initialY[activeElement.id] = e.clientY - (yOffset[activeElement.id] || 0);
            }
        }
    }

    function dragEnd(e) {
        initialX[activeElement.id] = currentX[activeElement.id];
        initialY[activeElement.id] = currentY[activeElement.id];

        activeElement = false;
    }

    function drag(e) {
        if (activeElement) {
            e.preventDefault();

            if (e.type === "touchmove") {
                currentX[activeElement.id] = e.touches[0].clientX - initialX[activeElement.id];
                currentY[activeElement.id] = e.touches[0].clientY - initialY[activeElement.id];
            } else {
                currentX[activeElement.id] = e.clientX - initialX[activeElement.id];
                currentY[activeElement.id] = e.clientY - initialY[activeElement.id];
            }

            xOffset[activeElement.id] = currentX[activeElement.id];
            yOffset[activeElement.id] = currentY[activeElement.id];

            var eye = "left";
            if (activeElement.id === "rightEyePosition") {
                eye = "right";
            }

            setTranslate(currentX[activeElement.id], currentY[activeElement.id], eye, "htmlDrag");
        }
    }
}

    
// Returns a linearly scaled value based on `factor` and the other inputs
function linearScale(factor, minInput, maxInput, minOutput, maxOutput) {
    return minOutput + (maxOutput - minOutput) *
    (factor - minInput) / (maxInput - minInput);
}


function clamp(input, min, max) {
    return Math.min(Math.max(input, min), max);
}


function overrideHTMLPositionData(elementID, x, y) {
    currentX[elementID] = x;
    initialX[elementID] = x;
    xOffset[elementID] = x;
    currentY[elementID] = y;
    initialY[elementID] = y;
    yOffset[elementID] = y;
}


var XY_PX_MIN = -100;
var XY_PX_MAX = 100;
function setTranslate(xPos, yPos, eye, source) {
    xPos = clamp(xPos, XY_PX_MIN, XY_PX_MAX);
    yPos = clamp(yPos, XY_PX_MIN, XY_PX_MAX);

    var elementID = "leftEyePosition";
    if (eye === "right") {
        elementID = "rightEyePosition";
    }

    var el;
    if (eye !== "both") {
        el = document.getElementById(elementID);
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        if (source !== "htmlDrag") {
            overrideHTMLPositionData(elementID, xPos, yPos);
        }
    } else if (eye === "both") {
        elementID = "leftEyePosition";
        el = document.getElementById(elementID);
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        if (source !== "htmlDrag") {
            overrideHTMLPositionData(elementID, xPos, yPos);
        }
        elementID = "rightEyePosition";
        el = document.getElementById(elementID);
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
        if (source !== "htmlDrag") {
            overrideHTMLPositionData(elementID, xPos, yPos);
        }
    }

    var xPosFraction = linearScale(xPos, XY_PX_MIN, XY_PX_MAX, 0, 1);
    var yPosFraction = linearScale(yPos, XY_PX_MIN, XY_PX_MAX, 0, 1);

    var method = source === "htmlDrag" ? "updateEyePosition" : "presetButtonClicked";
    emitAppSpecificEvent(method, {
        "eye": eye,
        "xPosFraction": xPosFraction,
        "yPosFraction": yPosFraction
    });
}


function presetButtonClicked(el) {
    var validPreset = true;

    switch (el.id) {
        case "eyerollPreset":
            setTranslate(
                linearScale(0.65, 0, 1, XY_PX_MIN, XY_PX_MAX),
                linearScale(0.28, 0, 1, XY_PX_MIN, XY_PX_MAX),
                "both"
            );
        break;


        case "crosseyedPreset":
            setTranslate(
                linearScale(0.72, 0, 1, XY_PX_MIN, XY_PX_MAX),
                linearScale(0.63, 0, 1, XY_PX_MIN, XY_PX_MAX),
                "left"
            );
            setTranslate(
                linearScale(0.28, 0, 1, XY_PX_MIN, XY_PX_MAX),
                linearScale(0.63, 0, 1, XY_PX_MIN, XY_PX_MAX),
                "right"
            );
        break;


        case "worgPreset":
            setTranslate(
                linearScale(0.5, 0, 1, XY_PX_MIN, XY_PX_MAX),
                linearScale(0, 0, 1, XY_PX_MIN, XY_PX_MAX),
                "both"
            );
        break;


        case "unrealisticPreset":
            setTranslate(
                linearScale(0.23, 0, 1, XY_PX_MIN, XY_PX_MAX),
                linearScale(0.63, 0, 1, XY_PX_MIN, XY_PX_MAX),
                "left"
            );
            setTranslate(
                linearScale(0.82, 0, 1, XY_PX_MIN, XY_PX_MAX),
                linearScale(0.38, 0, 1, XY_PX_MIN, XY_PX_MAX),
                "right"
            );
        break;


        default:
            validPreset = false;
            console.log("Unhandled preset clicked: " + element.id);
            break;
    }

    if (validPreset){
        document.getElementById("combineCheckbox").checked = false;
        document.getElementById("rightEyeController").style.display = "block";
    }
}


function handleCombinedSetting(combinedSetting) {
    if (combinedSetting) {
        document.getElementById("rightEyeController").style.display = "none";
    } else {
        document.getElementById("rightEyeController").style.display = "block";
        var leftEyePosition = document.getElementById("leftEyePosition");
        var rightEyePosition = document.getElementById("rightEyePosition");

        rightEyePosition.style.transform = leftEyePosition.style.transform;
    }
}


function combineCheckboxClicked(el) {
    emitAppSpecificEvent("combineCheckboxClicked", el.checked);

    handleCombinedSetting(el.checked);
}


// Disables the loading spinner
function initializeUI(data) {
    document.getElementById("loadingContainer").style.display = "none";

    document.getElementById("combineCheckbox").checked = data.combineChecked;
    handleCombinedSetting(data.combineChecked);
}


// Handle messages over the EventBridge from the App JS
function onScriptEventReceived(scriptEvent) {
    var event = scriptEvent;
    try {
        event = JSON.parse(event);
    } catch (error) {
        return;
    }

    if (event.app !== APP_NAME) {
        return;
    }

    switch (event.method) {
        case "initializeUI":
            initializeUI(event.data);
            break;


        default:
            console.log("Unrecognized event method supplied to App UI JS: " + event.method);
            break;
    }
}


// This delay is necessary to allow for the JS EventBridge to become active.
// The delay is still necessary for HTML apps in RC78+.
var EVENTBRIDGE_SETUP_DELAY = 500;
function onLoad() {
    setupDragging();

    setTimeout(function () {
        EventBridge.scriptEventReceived.connect(onScriptEventReceived);
        emitAppSpecificEvent("eventBridgeReady");
    }, EVENTBRIDGE_SETUP_DELAY);
}


// Call onLoad() once the DOM is ready
document.addEventListener("DOMContentLoaded", function (event) {
    onLoad();
});