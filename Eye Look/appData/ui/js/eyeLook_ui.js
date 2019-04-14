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


function setupDragging() {
    var dragElements = [];
    dragElements.push(document.getElementById("leftEyePosition"));
    dragElements.push(document.getElementById("rightEyePosition"));

    var containerElements = [];
    containerElements.push(document.getElementById("leftEyeController"));
    containerElements.push(document.getElementById("rightEyeController"));

    var activeElement = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    containerElements.forEach(function(element) {
        element.addEventListener("touchstart", dragStart, false);
        element.addEventListener("touchend", dragEnd, false);
        element.addEventListener("touchmove", drag, false);
    
        element.addEventListener("mousedown", dragStart, false);
        element.addEventListener("mouseup", dragEnd, false);
        element.addEventListener("mousemove", drag, false);
    });

    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }

        if (dragElements.indexOf(e.target) > -1) {
            activeElement = e.target;
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;

        activeElement = false;
    }

    function drag(e) {
        if (activeElement) {

            e.preventDefault();

            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, activeElement);
        }
    }

    function clamp(input, min, max) {
        return Math.min(Math.max(input, min), max);
    }

    var X_PX_MIN = -100;
    var X_PX_MAX = 100;
    var Y_PX_MIN = -100;
    var Y_PX_MAX = 100;
    function setTranslate(xPos, yPos, el) {
        xPos = clamp(xPos, X_PX_MIN, X_PX_MAX);
        yPos = clamp(yPos, Y_PX_MIN, Y_PX_MAX);

        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";

        var xPosFraction = (xPos - X_PX_MIN) / (X_PX_MAX - X_PX_MIN);
        var yPosFraction = (yPos - Y_PX_MIN) / (Y_PX_MAX - Y_PX_MIN);

        emitAppSpecificEvent("updateEyePosition", {
            "eye": el.id === "leftEyePosition" ? "left" : "right",
            "xPosFraction": xPosFraction,
            "yPosFraction": yPosFraction
        });
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