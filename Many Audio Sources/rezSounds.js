//
//  Created by Zach Fox on 2019-12-02
//  Copyright 2019 High Fidelity, Inc.
// 
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html

(function () {
    // Static sound emitter properties
    var SOUND_EMITTER_PROPS_STATIC = {
        "type": "Box",
        "shape": "Cube",
        "name": "Sound Emitter",
        "dimensions": {
            "x": 0.3,
            "y": 0.3,
            "z": 0.3
        },
        "rotation": {
            "x": 0,
            "y": 0,
            "z": 0,
            "w": 1
        },
        "grab": {
            "grabbable": false,
        },
        "serverScripts": "https://content.highfidelity.com/Experiences/Releases/usefulUtilities/soundEmitter/v1.2/soundEmitter.js"
    };


    // Initialize all position and sound arrays
    var ALL_SOUND_OBJECTS = [];
    var ALL_RANDOM_POSITION_ARRAYS = [];
    var ALL_RANDOM_SOUND_ARRAYS = [];


    // Here's where we define all of the possible positions and sounds
    // for all areas in the domain.
    var MEZZANINE_SOUND_OBJECTS = [
        {
            "position": {"x":132.05349731445312,"y":-94.09229278564453,"z":-381.243896484375},
            "sound": Script.resolvePath("sounds/TheGreatDictatorWithTime.mp3"),
            "vol": 0.75
        },
        {
            "position": {"x":137.9347686767578,"y":-94.09234619140625,"z":-382.2602233886719},
            "sound": Script.resolvePath("sounds/whisper01.mp3"),
            "vol": 1.0
        },
    ];
    ALL_SOUND_OBJECTS.push(MEZZANINE_SOUND_OBJECTS);
    var MEZZANINE_RANDOM_POSITIONS = [
    ];
    ALL_RANDOM_POSITION_ARRAYS.push(MEZZANINE_RANDOM_POSITIONS);
    var MEZZANINE_RANDOM_SOUNDS = [
    ];
    ALL_RANDOM_SOUND_ARRAYS.push(MEZZANINE_RANDOM_SOUNDS);
    
    var MISC_SOUND_OBJECTS = [
        {
            "position": {"x":153.5306854248047,"y":-93.29264068603516,"z":-379.3279113769531},
            "sound": Script.resolvePath("sounds/jungle01.mp3"),
            "vol": 0.3
        },
    ];
    ALL_SOUND_OBJECTS.push(MISC_SOUND_OBJECTS);
    var MISC_RANDOM_POSITIONS = [
    ];
    ALL_RANDOM_POSITION_ARRAYS.push(MISC_RANDOM_POSITIONS);
    var MISC_RANDOM_SOUNDS = [
    ];
    ALL_RANDOM_SOUND_ARRAYS.push(MISC_RANDOM_SOUNDS);

    // Template for adding additional position/sound arrays.
    // For the sound object array, empty objects are allowed.
    // Position and sound key/value pairs are optional for each element in the object array.
    // For each element in the object array that does not contain a `position` key/value pair,
    // there must exist a corresponding position object in the associated "random positions" array.
    //
    // Use this in the scripting console to make this process easier:
    // Window.copyToClipboard(JSON.stringify(MyAvatar.position) + ",");
/*
    var _SOUND_OBJECTS = [
        {
            "position": 
            "sound": Script.resolvePath("sounds/.mp3"),
            "vol": 0.5
        },
    ];
    ALL_SOUND_OBJECTS.push(_SOUND_OBJECTS);
    var _RANDOM_POSITIONS = [
    ];
    ALL_RANDOM_POSITION_ARRAYS.push(_RANDOM_POSITIONS);
    var _RANDOM_SOUNDS = [
        Script.resolvePath("sounds/.mp3")
    ];
    ALL_RANDOM_SOUND_ARRAYS.push(_RANDOM_SOUNDS);
*/

    var addedEntities = [];
    var entityCounter = 0;
    function rezWrapper(props) {
        props["color"] = {
            "red": Math.floor(Math.random() * 255),
            "green": Math.floor(Math.random() * 255),
            "blue": Math.floor(Math.random() * 255)
        };
        props["name"] += " " + (entityCounter++);

        console.log("Rezzing " + props["name"]);

        addedEntities.push(Entities.addEntity(props));
    }
    

    // Add all sound emitter entities
    var currentSoundObjectsArray;
    var currentRandomPositionArray;
    var currentRandomSoundArray;
    var currentProps;
    var RANDOM_VOLUME_MIN = 0.25;
    var RANDOM_VOLUME_MAX = 0.75;
    for (var i = 0; i < ALL_SOUND_OBJECTS.length; i++) {
        currentSoundObjectsArray = ALL_SOUND_OBJECTS[i];
        currentRandomPositionArray = ALL_RANDOM_POSITION_ARRAYS[i];
        currentRandomSoundArray = ALL_RANDOM_SOUND_ARRAYS[i];

        for (var j = 0; j < currentSoundObjectsArray.length; j++) {
            currentProps = SOUND_EMITTER_PROPS_STATIC;

            // Logic for determining the position of the current sound.
            // If no position is specified in the current object, try to use a random one.
            currentProps["position"] = currentSoundObjectsArray[j]["position"]
            if (!currentProps.position) {
                if (currentRandomPositionArray.length > 0) {
                    currentRandomPositionArray.splice(Math.floor(Math.random() * currentRandomPositionArray.length))[0];
                } else {
                    console.log("FATAL ERROR: A sound was specified, but its position wasn't specified and there's nowhere random to place it.");
                    onScriptEnding();
                    return;
                }
            };

            // Logic for determining the position of the current sound.
            // If no sound URL is specified in the current object, use a random one.
            // If no sound volume is specified in the current object, use some default.
            currentProps["userData"] = JSON.stringify({
                "soundURL": currentSoundObjectsArray[j]["sound"] || currentRandomSoundArray[Math.floor(Math.random() * currentRandomSoundArray.length)],
                "volume": currentSoundObjectsArray[j]["vol"] || Math.random() * (RANDOM_VOLUME_MAX - RANDOM_VOLUME_MIN) + RANDOM_VOLUME_MIN,
                "shouldLoop": true
            });

            rezWrapper(currentProps);
        }
    }

    
    // Delete all rezzed sound emitter when this client script ends
    function onScriptEnding() {
        for (var i = 0; i < addedEntities.length; i++) {
            Entities.deleteEntity(addedEntities[i]);
        }

        addedEntities = [];
    }
    Script.scriptEnding.connect(onScriptEnding);
})();