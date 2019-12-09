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
    
    var TTS_SOUND_OBJECTS = [
        {
            "position": {"x":133.19183349609375,"y":-97.55361938476562,"z":-380.91943359375},
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_11_8_55-01.wav"),
            "vol": 0.65
        },
        {
            "position": {"x":132.8817596435547,"y":-97.5537109375,"z":-382.8327331542969},
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_11_8_55-02.wav"),
            "vol": 0.65
        },
        {
            "position": {"x":134.69569396972656,"y":-97.55369567871094,"z":-382.1865539550781},
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_11_8_55-03.wav"),
            "vol": 0.65
        },

        {
            "position": {"x":148.70884704589844,"y":-97.5538330078125,"z":-385.4180603027344},
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_11_53_40-01.wav"),
            "vol": 0.65
        },
        {
            "position": {"x":146.84303283691406,"y":-97.55380249023438,"z":-384.5888977050781},
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_11_53_40-02.wav"),
            "vol": 0.65
        },

        {
            "position": {"x":155.66416931152344,"y":-96.59042358398438,"z":-417.9356384277344},
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_12_6_12-01.wav"),
            "vol": 0.65
        },
        {
            "position": {"x":153.79824829101562,"y":-96.59404754638672,"z":-417.75030517578125},
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_12_6_12-02.wav"),
            "vol": 0.65
        },

        {
            "position": {"x":173.56297302246094,"y":-98.0467300415039,"z":-356.60595703125},
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_12_42_16-01.wav"),
            "vol": 0.65
        },
        {
            "position": {"x":174.18692016601562,"y":-98.0467300415039,"z":-357.5437316894531},
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_12_42_16-02.wav"),
            "vol": 0.65
        },
    ];
    ALL_SOUND_OBJECTS.push(TTS_SOUND_OBJECTS);
    var TTS_RANDOM_POSITIONS = [
    ];
    ALL_RANDOM_POSITION_ARRAYS.push(TTS_RANDOM_POSITIONS);
    var TTS_RANDOM_SOUNDS = [
    ];
    ALL_RANDOM_SOUND_ARRAYS.push(TTS_RANDOM_SOUNDS);
    
    var MUSIC_SOUND_OBJECTS = [
        {
            "position": {"x":171.72836303710938,"y":-98.92471313476562,"z":-355.6170654296875},
            "sound": Script.resolvePath("sounds/wipeout.mp3"),
            "vol": 0.10
        },
    ];
    ALL_SOUND_OBJECTS.push(MUSIC_SOUND_OBJECTS);
    var MUSIC_RANDOM_POSITIONS = [
    ];
    ALL_RANDOM_POSITION_ARRAYS.push(MUSIC_RANDOM_POSITIONS);
    var MUSIC_RANDOM_SOUNDS = [
    ];
    ALL_RANDOM_SOUND_ARRAYS.push(MUSIC_RANDOM_SOUNDS);
    
    var MISC_SOUND_OBJECTS = [
        {
            "position": {"x":153.5306854248047,"y":-93.29264068603516,"z":-379.3279113769531},
            "sound": Script.resolvePath("sounds/jungle01.mp3"),
            "vol": 0.12
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
        props["name"] = "Sound Emitter " + (entityCounter);
        entityCounter++;

        console.log("Rezzing " + props["name"]);

        addedEntities.push(Entities.addEntity(props));
    }
    
    function addAllEntities() {
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
    }


    function deleteAllSoundEmitterEntities() {
        var entityIDs = Entities.findEntities(MyAvatar.position, 100000);
        for (var i = 0; i < entityIDs.length; i++) {
            var props = Entities.getEntityProperties(entityIDs[i], ["name"]);
            if (props.name && props.name.indexOf("Sound Emitter") > -1) {
                Entities.deleteEntity(entityIDs[i]);
            }
        }

        for (var i = 0; i < addedEntities.length; i++) {
            Entities.deleteEntity(addedEntities[i]);
        }

        addedEntities = [];
        entityCounter = 0;
    }


    var isOn = false;
    function onButtonClicked() {
        isOn = !isOn;
        deleteAllSoundEmitterEntities();

        if (isOn) {
            addAllEntities();
        }

        tabletButton.editProperties({isActive: isOn});
    }


    var tabletName = "com.highfidelity.interface.tablet.system";
    var tablet = Tablet.getTablet(tabletName);
    var buttonOptions = {
        text: "SOUNDS"
    };
    var tabletButton = tablet.addButton(buttonOptions);
    tabletButton.clicked.connect(onButtonClicked);

    
    // Delete all rezzed sound emitter when this client script ends
    function onScriptEnding() {
        deleteAllSoundEmitterEntities();
        if (tabletButton) {
            tabletButton.clicked.disconnect(onButtonClicked);
            tabletButton.removeButton(tabletButton);
        }
    }
    Script.scriptEnding.connect(onScriptEnding);
})();