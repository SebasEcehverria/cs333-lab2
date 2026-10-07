// Find every HTML element that has the class "drum".
let drumButtons = document.querySelectorAll(".drum");

// Stores the recorded drum hits.
let recordedBeat = [];

// Stores new drum hits when recording over a loop.
let overdubBeat = [];

// Keeps track of whether we are recording.
let isRecording = false;

// Keeps track of whether the beat is looping.
let isLooping = false;

// When a normal recording started.
let recordingStartTime = 0;

// How long the recorded beat is.
let recordedBeatLength = 0;

// When the current loop cycle started.
let loopCycleStartTime = 0;

// Timer used to repeat the loop.
let loopTimer;

console.log("Number of drum buttons:", drumButtons.length);


// ------------------------------------
// CLICK EVENTS
// ------------------------------------

// Loop through every drum button and add a click event listener.
for (let i = 0; i < drumButtons.length; i++) {

    drumButtons[i].addEventListener("click", function (event) {

        // event.target is the exact button that was clicked.
        let buttonKey = event.target.innerHTML.toLowerCase();

        console.log("Button clicked:", buttonKey);

        // Save the hit if we are currently recording.
        recordHit(buttonKey);

        // Play the correct drum sound.
        playSound(buttonKey);

        // Make the button react visually.
        buttonAnimation(buttonKey);
    });
}


// ------------------------------------
// KEYBOARD EVENTS
// ------------------------------------

document.addEventListener("keydown", function (event) {

    // Prevent holding the key down from rapidly repeating.
    if (event.repeat) {
        return;
    }

    let key = event.key.toLowerCase();

    console.log("Key pressed:", key);

    // Only respond to drum keys.
    if ("wasdjkl".includes(key)) {

        // Save the hit if we are recording.
        recordHit(key);

        playSound(key);

        buttonAnimation(key);
    }
});


// ------------------------------------
// PLAY DRUM SOUND
// ------------------------------------

function playSound(key) {

    console.log("Trying to play sound for:", key);

    let sound;

    switch (key) {

        case "w":
            sound = new Audio("sounds/tom-1.mp3");
            break;

        case "a":
            sound = new Audio("sounds/tom-2.mp3");
            break;

        case "s":
            sound = new Audio("sounds/tom-3.mp3");
            break;

        case "d":
            sound = new Audio("sounds/tom-4.mp3");
            break;

        case "j":
            sound = new Audio("sounds/snare.mp3");
            break;

        case "k":
            sound = new Audio("sounds/crash.mp3");
            break;

        case "l":
            sound = new Audio("sounds/kick-bass.mp3");
            break;

        default:
            console.log("That key is not part of the drum kit.");
            return;
    }

    sound.play();
}


// ------------------------------------
// RECORD DRUM HIT
// ------------------------------------

function recordHit(key) {

    // If recording is off, do nothing.
    if (!isRecording) {
        return;
    }

    let time;

    // If a beat is looping, record this as an overdub.
    if (isLooping && recordedBeatLength > 0) {

        // Figure out where we currently are inside the loop.
        time = (Date.now() - loopCycleStartTime) % recordedBeatLength;

        overdubBeat.push({
            key: key,
            time: time
        });

        console.log("Overdub recorded:", key, "at", time);
    }

    // Otherwise record a brand-new beat.
    else {

        time = Date.now() - recordingStartTime;

        recordedBeat.push({
            key: key,
            time: time
        });

        console.log("Recorded:", key, "at", time);
    }
}


// ------------------------------------
// BUTTON ANIMATION
// ------------------------------------

function buttonAnimation(key) {

    let activeButton = document.querySelector("." + key);

    // If the key does not have a matching drum button, stop.
    if (activeButton === null) {
        return;
    }

    activeButton.classList.add("pressed");

    // Remove the pressed effect after 100 milliseconds.
    setTimeout(function () {

        activeButton.classList.remove("pressed");

    }, 100);
}


// ------------------------------------
// RECORD BUTTON
// ------------------------------------

document.getElementById("recordButton").addEventListener("click", function () {

    // If a beat is already looping, record another layer over it.
    if (isLooping) {

        overdubBeat = [];

        isRecording = true;

        document.getElementById("recordStatus").textContent =
            "🔴 Recording over the loop...";

        console.log("Overdub recording started");
    }

    // Otherwise create a completely new beat.
    else {

        recordedBeat = [];

        recordingStartTime = Date.now();

        isRecording = true;

        document.getElementById("recordStatus").textContent =
            "🔴 Recording... play some drums!";

        console.log("New recording started");
    }
});


// ------------------------------------
// STOP RECORDING BUTTON
// ------------------------------------

document.getElementById("stopButton").addEventListener("click", function () {

    if (!isRecording) {
        return;
    }

    isRecording = false;

    // If recording over a loop, add the new layer to the old beat.
    if (isLooping) {

        recordedBeat = recordedBeat.concat(overdubBeat);

        // Put the drum hits back into chronological order.
        recordedBeat.sort(function (a, b) {
            return a.time - b.time;
        });

        overdubBeat = [];

        document.getElementById("recordStatus").textContent =
            "Overdub saved! 🔁 Loop is still playing.";

        console.log("Overdub saved");
    }

    // If this was a normal recording, calculate its length.
    else {

        recordedBeatLength = Date.now() - recordingStartTime;

        document.getElementById("recordStatus").textContent =
            "Recording stopped. Press Play or Loop!";

        console.log("Recording stopped");
        console.log("Beat length:", recordedBeatLength);
    }
});


// ------------------------------------
// PLAY RECORDED BEAT
// ------------------------------------

function playRecordedBeat() {

    // Loop through every recorded drum hit.
    for (let i = 0; i < recordedBeat.length; i++) {

        setTimeout(function () {

            playSound(recordedBeat[i].key);

            buttonAnimation(recordedBeat[i].key);

        }, recordedBeat[i].time);
    }
}


// ------------------------------------
// PLAY BUTTON
// ------------------------------------

document.getElementById("playButton").addEventListener("click", function () {

    if (recordedBeat.length === 0) {

        document.getElementById("recordStatus").textContent =
            "Record a beat first!";

        return;
    }

    playRecordedBeat();

    document.getElementById("recordStatus").textContent =
        "▶ Playing your beat...";

    console.log("Playing recorded beat:", recordedBeat);
});


// ------------------------------------
// LOOP BUTTON
// ------------------------------------

document.getElementById("loopButton").addEventListener("click", function () {

    // If the loop is already playing, stop it.
    if (isLooping) {

        isLooping = false;

        clearTimeout(loopTimer);

        this.textContent = "🔁 Loop Beat";

        document.getElementById("recordStatus").textContent =
            "Loop stopped.";

        console.log("Loop stopped");

        return;
    }

    // Do not start a loop if nothing has been recorded.
    if (recordedBeat.length === 0) {

        document.getElementById("recordStatus").textContent =
            "Record a beat first!";

        return;
    }

    isLooping = true;

    this.textContent = "⏹ Stop Loop";

    document.getElementById("recordStatus").textContent =
        "🔁 Looping... play along or press Record to add another layer!";

    console.log("Loop started");

    loopBeat();
});


// ------------------------------------
// LOOP THE BEAT
// ------------------------------------

function loopBeat() {

    // Stop if looping has been turned off.
    if (!isLooping) {
        return;
    }

    // Save when this loop cycle started.
    loopCycleStartTime = Date.now();

    // Play the recorded beat once.
    playRecordedBeat();

    // When the recording ends, play it again.
    loopTimer = setTimeout(function () {

        loopBeat();

    }, recordedBeatLength);
}