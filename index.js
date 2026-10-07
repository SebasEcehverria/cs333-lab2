// Find every HTML element that has the class "drum".
let drumButtons = document.querySelectorAll(".drum");

console.log("Number of drum buttons:", drumButtons.length);

// Loop through every drum button and add a click event listener.
for (let i = 0; i < drumButtons.length; i++) {

    drumButtons[i].addEventListener("click", function (event) {

        // event.target is the actual button that was clicked.
        console.log("Button clicked:", event.target.innerHTML);

        // Store the letter from the button.
        let buttonKey = event.target.innerHTML;

        // Use the same function for clicking and keyboard presses.
        playSound(buttonKey);

        // Make the button react visually.
        buttonAnimation(buttonKey);
    });
}


// Listen for keyboard presses anywhere on the page.
document.addEventListener("keydown", function (event) {

    console.log("Key pressed:", event.key);

    // Convert the key to lowercase just in case Caps Lock is on.
    let key = event.key.toLowerCase();

    // Use the same sound function used by mouse clicks.
    playSound(key);

    buttonAnimation(key);
});


// Plays the correct sound depending on the key.
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


// Temporarily adds the "pressed" CSS class to a drum button.
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