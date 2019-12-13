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
        }
    };


    // Initialize all position and sound arrays
    var ALL_SOUND_OBJECTS = [];
    var ALL_RANDOM_POSITION_ARRAYS = [];
    var ALL_RANDOM_SOUND_ARRAYS = [];


    // Here's where we define all of the possible positions and sounds
    // for all areas in the domain.
    var MEZZANINE_SOUND_OBJECTS = [
        {
            "position": { "x": 132.05349731445312, "y": -94.09229278564453, "z": -381.243896484375 },
            "sound": Script.resolvePath("sounds/TheGreatDictatorWithTime.mp3"),
            "vol": 0.75
        },
        {
            "position": { "x": 137.9347686767578, "y": -94.09234619140625, "z": -382.2602233886719 },
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
        // INTRODUCTION CONVERSATION
        {
            "position": { "x": 133.19183349609375, "y": -97.55361938476562, "z": -380.91943359375 },
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_11_8_55-01.wav"),
            "vol": 0.65
        },
        {
            "position": { "x": 132.8817596435547, "y": -97.5537109375, "z": -382.8327331542969 },
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_11_8_55-02.wav"),
            "vol": 0.65
        },
        {
            "position": { "x": 134.69569396972656, "y": -97.55369567871094, "z": -382.1865539550781 },
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_11_8_55-03.wav"),
            "vol": 0.65
        },

        // HELPDESK CONVERSATION
        {
            "position": { "x": 148.70884704589844, "y": -97.5538330078125, "z": -385.4180603027344 },
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_11_53_40-01.wav"),
            "vol": 0.65
        },
        {
            "position": { "x": 146.84303283691406, "y": -97.55380249023438, "z": -384.5888977050781 },
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_11_53_40-02.wav"),
            "vol": 0.65
        },

        // STANDING NEXT TO PORTAL
        {
            "position": { "x": 155.66416931152344, "y": -96.59042358398438, "z": -417.9356384277344 },
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_12_6_12-01.wav"),
            "vol": 0.65,
            "canBeClientSide": true
        },
        {
            "position": { "x": 153.79824829101562, "y": -96.59404754638672, "z": -417.75030517578125 },
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_12_6_12-02.wav"),
            "vol": 0.65,
            "canBeClientSide": true
        },

        // SURFING CONVERSATION
        {
            "position": { "x": 173.56297302246094, "y": -98.0467300415039, "z": -356.60595703125 },
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_12_42_16-01.wav"),
            "vol": 0.65,
            "canBeClientSide": true
        },
        {
            "position": { "x": 174.18692016601562, "y": -98.0467300415039, "z": -357.5437316894531 },
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_12_42_16-02.wav"),
            "vol": 0.65,
            "canBeClientSide": true
        },

        // DISCUSSION OUTSIDE CLUB
        {
            "position": { "x": 121.00153350830078, "y": -97.55286407470703, "z": -364.0657043457031 },
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_13_14_49-01.wav"),
            "vol": 0.65
        },
        {
            "position": { "x": 122.27934265136719, "y": -97.55290985107422, "z": -365.3329772949219 },
            "sound": Script.resolvePath("sounds/tts/out/ttsMP3.com_VoiceText_2019-12-9_13_14_49-02.wav"),
            "vol": 0.65
        },

        // CLUB CONVERSATION 01
        {
            "position": { "x": 100.63528442382812, "y": -97.44933319091797, "z": -367.5354309082031 },
            "sound": Script.resolvePath("sounds/tts/2019-12-09_17-25-57_Amy.mp3"),
            "vol": 0.65
        },
        {
            "position": { "x": 99.13320922851562, "y": -97.44933319091797, "z": -368.4339904785156 },
            "sound": Script.resolvePath("sounds/tts/2019-12-09_17-25-57_Geraint.mp3"),
            "vol": 0.65
        },

        // CLUB CONVERSATION 02
        {
            "position": { "x": 98.65325164794922, "y": -97.4497299194336, "z": -373.1451721191406 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-37-25_Brian.mp3"),
            "vol": 0.65
        },
        {
            "position": { "x": 100.76658630371094, "y": -97.44979095458984, "z": -372.8324890136719 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-37-25_Matthew.mp3"),
            "vol": 0.65
        },

        // CLUB CONVERSATION 03
        {
            "position": { "x": 106.77306365966797, "y": -97.45008850097656, "z": -367.2292785644531 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-43-56_Emma.mp3"),
            "vol": 0.65
        },
        {
            "position": { "x": 105.53514862060547, "y": -97.45001983642578, "z": -367.12060546875 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-43-56_Ivy.mp3"),
            "vol": 0.65
        },
        {
            "position": { "x": 105.77860260009766, "y": -97.45013427734375, "z": -368.4234313964844 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-43-56_Kendra.mp3"),
            "vol": 0.65
        },
        {
            "position": { "x": 106.7406234741211, "y": -97.45018005371094, "z": -368.4776916503906 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-43-56_Raveena.mp3"),
            "vol": 0.65
        },

        // KITES
        {
            "position": { "x": 152.52630615234375, "y": -95.79975891113281, "z": -340.16387939453125 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-48-25_Joey.mp3"),
            "vol": 0.65,
            "canBeClientSide": true
        },
        {
            "position": { "x": 152.2245635986328, "y": -95.91361236572266, "z": -338.44805908203125 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-48-25_Salli.mp3"),
            "vol": 0.65,
            "canBeClientSide": true
        },

        // FIREPLACE CONVERSATION
        {
            "position": { "x": 160.75390625, "y": -97.84274291992188, "z": -346.04266357421875 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-55-07_Aditi.mp3"),
            "vol": 0.65,
            "canBeClientSide": true
        },
        {
            "position": { "x": 159.70945739746094, "y": -97.81897735595703, "z": -346.0223693847656 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-55-07_Geraint.mp3"),
            "vol": 0.65,
            "canBeClientSide": true
        },
        {
            "position": { "x": 158.43898010253906, "y": -97.7889175415039, "z": -346.0556640625 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-55-07_Kimberly.mp3"),
            "vol": 0.65,
            "canBeClientSide": true
        },
        {
            "position": { "x": 156.7364959716797, "y": -97.77129364013672, "z": -344.9445495605469 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-55-07_Amy.mp3"),
            "vol": 0.65,
            "canBeClientSide": true
        },
        {
            "position": { "x": 156.62762451171875, "y": -97.79556274414062, "z": -343.8051452636719 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-55-07_Justin.mp3"),
            "vol": 0.65,
            "canBeClientSide": true
        },
        {
            "position": { "x": 156.5111541748047, "y": -97.82134246826172, "z": -342.59405517578125 },
            "sound": Script.resolvePath("sounds/tts/2019-12-12_11-55-07_Ivy.mp3"),
            "vol": 0.65,
            "canBeClientSide": true
        },

        // CONVERSATION IN OFFICE
        {
            "position": { "x": 126.4735107421875, "y": -97.39180755615234, "z": -399.7191467285156 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Amy.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 125.3471908569336, "y": -97.39165496826172, "z": -399.1423034667969 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Emma.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 124.00908660888672, "y": -97.39153289794922, "z": -399.12451171875 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Brian.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 122.99781036376953, "y": -97.39146423339844, "z": -399.4334411621094 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Ivy.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 122.1426773071289, "y": -97.39143371582031, "z": -400.03033447265625 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Joanna.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 121.40765380859375, "y": -97.39144134521484, "z": -400.8778381347656 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Kendra.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 121.037841796875, "y": -97.39151000976562, "z": -401.99859619140625 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Kimberly.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 120.93130493164062, "y": -97.39170837402344, "z": -404.10626220703125 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Salli.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 121.41535186767578, "y": -97.39183807373047, "z": -405.19830322265625 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Joey.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 122.10960388183594, "y": -97.39197540283203, "z": -405.9705810546875 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Justin.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 123.00946807861328, "y": -97.39213562011719, "z": -406.69219970703125 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Matthew.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 124.02095031738281, "y": -97.39224243164062, "z": -407.0000305175781 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Geraint.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 125.42831420898438, "y": -97.39236450195312, "z": -406.85906982421875 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Nicole.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
        },
        {
            "position": { "x": 126.42137145996094, "y": -97.39240264892578, "z": -406.3570861816406 },
            "sound": Script.resolvePath("sounds/tts/2019-12-13_11-17-00_Russell.mp3"),
            "vol": 0.7,
            "canBeClientSide": true
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
            "position": { "x": 171.72836303710938, "y": -98.92471313476562, "z": -355.6170654296875 },
            "sound": Script.resolvePath("sounds/wipeout.mp3"),
            "vol": 0.10
        },
        {
            "position": { "x": 102.31254577636719, "y": -97.4500732421875, "z": -375.2565002441406 },
            "sound": Script.resolvePath("sounds/farFromOver.mp3"),
            "vol": 1.0
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
            "position": { "x": 153.5306854248047, "y": -93.29264068603516, "z": -379.3279113769531 },
            "sound": Script.resolvePath("sounds/jungle01.mp3"),
            "vol": 0.12
        },
        {
            "position": { "x": 159.7930908203125, "y": -96.83399963378906, "z": -373.4726867675781 },
            "sound": Script.resolvePath("sounds/haircut.mp3"),
            "vol": 1.0
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
    var numServerAudioInjectorsRezzed = 0;
    function rezSoundWrapper(props) {
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

    function rezMiscEntities() {
        var miscEntities = Script.require(Script.resolvePath("miscEntities.json?" + Date.now()));
        for (var i = 0; i < miscEntities.length; i++) {
            addedEntities.push(Entities.addEntity(miscEntities[i]));
        }
    }

    // `MAX_NUM_REZZED_AUDIO_INJECTORS` in `AudioInjectorManager.cpp` is set to `40`.
    // The server can't rez any more injectors than that, despite enabling multithreading on the audio mixer.
    // So, once we hit 40 server-side audio injectors, we need to rez the rest of our injectors here as client-side audio injectors.
    // This variable is set lower than 40 because there are already some injectors in the domain.
    var MAX_NUM_REZZED_AUDIO_INJECTORS = 34;
    var SOUND_EMITTER_SCRIPT_URL = "https://content.highfidelity.com/Experiences/Releases/usefulUtilities/soundEmitter/v1.2/soundEmitter.js";
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

                if (currentSoundObjectsArray[j]["canBeClientSide"]) {
                    currentProps["script"] = SOUND_EMITTER_SCRIPT_URL;
                    currentProps["serverScripts"] = "";
                } else {
                    if (numServerAudioInjectorsRezzed > MAX_NUM_REZZED_AUDIO_INJECTORS) {
                        console.log("A sound was not marked as `canBeClientSide`, but too many server-side injectors have already been created.\nThis sound will be clientside.");
                        currentProps["script"] = SOUND_EMITTER_SCRIPT_URL;
                        currentProps["serverScripts"] = "";
                    } else {
                        currentProps["script"] = "";
                        currentProps["serverScripts"] = SOUND_EMITTER_SCRIPT_URL;
                        numServerAudioInjectorsRezzed++;
                    }
                }
                
                console.log("ZRF HERE: "+ entityCounter);
                console.log(currentProps["script"]);
                console.log(currentProps["serverScripts"]);
                console.log("\n");

                rezSoundWrapper(currentProps);
            }
        }

        rezMiscEntities();
    }

    var entityNamesToDelete = ['Sound Emitter', 'Sound Emitter Misc'];
    function deleteAllRezzedEntities() {
        var entityIDs = Entities.findEntities(MyAvatar.position, 100000);
        for (var i = 0; i < entityIDs.length; i++) {
            var props = Entities.getEntityProperties(entityIDs[i], ["name"]);
            for (var j = 0; j < entityNamesToDelete.length; j++) {
                if (props.name && props.name.indexOf(entityNamesToDelete[j]) > -1) {
                    Entities.deleteEntity(entityIDs[i]);
                }
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
        deleteAllRezzedEntities();

        if (isOn) {
            addAllEntities();
        }

        tabletButton.editProperties({ isActive: isOn });
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
        deleteAllRezzedEntities();
        if (tabletButton) {
            tabletButton.clicked.disconnect(onButtonClicked);
            tablet.removeButton(tabletButton);
        }
    }
    Script.scriptEnding.connect(onScriptEnding);
})();