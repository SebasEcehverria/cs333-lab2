# cs333-lab2
JS event handlers + functions + loops: build a drum kit 🥁

Do each step below, and **answer the questions right here in this `README.md` file** as you go (type your answers under each question).

**How this lab works (three links to hand in):**
- **Your code:** make your own copy of this lab (click **Use this template**, or clone it),
  do your work, and **push it to your own GitHub repo** so I can see your code.
- **Your landing page:** your site's home page on `lampforall`, linking to all your labs.
- **Your live drum kit:** **SFTP your lab folder to your web folder on `lampforall`** so it
  runs at `.../students/yourname/lab2/`.

You'll submit all three links in Moodle (see the last step).

> ⚠️ **Two rules that keep "it works on my laptop" working on the server too:**
> 1. **Relative paths only.** Write `sounds/snare.mp3`, never `/sounds/snare.mp3`. A leading `/`
>    means "the root of the whole server," and your site lives under `/students/yourname/lab2/`.
> 2. **Filenames are case-sensitive on the server.** The server runs Linux: `Snare.mp3` and
>    `snare.mp3` are *different files* there, even though your Mac/Windows laptop treats them as the
>    same. Match the spelling *exactly*, including capitals and hyphens.

## Part 1: clicking

1. Open `index.html` with live preview. Notice there's no `<script>` tag yet. Create your JS in
   `index.js` and add the `<script>` tag yourself. Where in the page should it go, and why?
   (Hint: what happens if your script looks for the buttons before they exist?)

I put the script tag at the bottom of the body, right before the closing `</body>` tag. I did this because the HTML buttons need to exist before the JavaScript tries to find them. If the JavaScript runs before the buttons are created, `querySelectorAll()` would not be able to find them.

2. Add an event listener to **each** drum button. Use a **loop**, not seven copies of the same code.
   (Hint: `document.querySelectorAll(".drum")`)
3. Inside your listener, `console.log` which button was clicked. Your listener function receives an
   **event object**. Give it a parameter and look inside it:
   ```js
   button.addEventListener("click", function (event) {
     console.log(event.target.innerHTML);   // the letter on the button you clicked
   });
   ```
   What is `event.target`? (Try `console.log(event)` and poke around.) You'll use the same event
   object again in Part 2 for the keyboard.

`event.target` is the HTML element that caused the event. In this case, it is the specific drum button that I clicked. I can use properties such as `event.target.innerHTML` to find the letter inside the button.

4. Add a drum sound to the listener. Start with **one** sound for every button:
   ```js
   let sound = new Audio("sounds/tom-1.mp3");   // relative path!
   sound.play();
   ```
5. In `styles.css`, give each button a background image (`.w`, `.a`, `.s`, ...), using the files in `images/`.
   Note: paths in a CSS file are relative to **the CSS file**, not the HTML page.
   Check every filename against the real file *exactly* (case and hyphens count on the server).
6. Give each button its own sound that matches its image, so you have a playable drum kit.
   (Hint: a `switch` on the button's letter works well, and so does `if`/`else if`.)
   Watch out: the image and sound names don't match each other (`kick.png` vs `kick-bass.mp3`,
   `tom1.png` vs `tom-1.mp3`). Copy the real names.

## Part 2: the keyboard

7. Make the keyboard play the drums too: pressing `w` plays the same sound as clicking the `w` button.
   One way: add a `keydown` listener to the whole `document`, and use `event.key` to see which key was pressed.
8. Don't repeat yourself: clicking and typing should both call **the same function** that plays a sound
   for a given key. How did you organize that?

I made one function called `playSound(key)` that takes a key as its parameter. Both the button click event and the keyboard event call this same function. This keeps me from having to write all of the sound code twice.

9. Use `console.log` to see what's happening while you build this. Important! **Leave these in your code.**
10. Comment your code in an educational way: not for the public, but to write down how everything works. I will be looking for this!
11. Optional: make the button visibly react when played (hint: there's a `.pressed` class in the CSS, plus `classList` and `setTimeout`).

## Organize your site: a landing page for all your labs

From now on, your site at `.../students/yourname/` is your **landing page**: the home base that
links to every lab you do this term. Set it up like this in your web folder:

```
public_html/            ← https://.../students/yourname/
├── index.html          ← your landing page (home)
├── lab1/               ← your Lab 1 form pages (form.html, submit.php, ...)
└── lab2/               ← this drum kit
```

12. Make (or clean up) your landing page `index.html`: your name, a short intro, and a link to each lab.
    Give each lab a line or two saying what it is. Make it look like *yours*.
13. Move your Lab 1 files into a `lab1/` folder. After moving them, **re-test your form**: does it still submit
    and show the results? Why does a form whose `action` is `submit.php` (a relative path) keep working when the
    whole folder moves together?

The form still works after moving the Lab 1 files because `action="submit.php"` is a relative path. The browser looks for `submit.php` in the same folder as the form. Since both files moved into the `lab1` folder together, their relationship did not change.

14. Every lab page needs a way back home. Add a link from the drum kit (and your Lab 1 pages) to your landing page:
    ```html
    <a href="../">← Home</a>
    ```
    `../` means "up one folder." Why would `href="/"` send you to the wrong place on our server?
    (Hint: rule 1 at the top.)

`../` means go up one folder, which takes me from a lab folder back to my landing page. Using `href="/"` would go to the root of the entire web server instead of my personal student website folder.

15. Links from your landing page go *down* into the folders: `href="lab1/"` and `href="lab2/"`.

## Deploy it

16. Test everything locally first, including every link, both ways.
17. However you have your SFTP set up, upload: your landing page `index.html`, the `lab1/` folder, and this lab as `lab2/`.
    You don't need to upload the hidden `.git` folder (the server won't serve it anyway).
    Remove the old Lab 1 files from the top of your web folder once `lab1/` works, so you don't have two copies.
18. Open your live site at `https://lampforall.cis251296.projects.jetstream-cloud.org/students/yourname/` and click
    through **everything**: home → Lab 1 → home → Lab 2 → home. Every image, sound and link should work there,
    not just locally.
19. **Works locally but broken on the server?** Open DevTools (right-click → Inspect) → **Console** and **Network** tabs,
    and look for red **404** errors. Almost every time it's one of the two rules at the top:
    a leading `/` in a path, or a filename whose case or spelling doesn't match.
    Did you hit one? Which one, and how did you fix it?

I checked my paths carefully and used relative paths for my images, sounds, and links. I also checked that the capitalization and spelling of the filenames matched the actual files. I used the Console and Network tabs in DevTools to check for 404 errors.

20. Push this repo (your code **and** this README with your answers) to **your own GitHub repo**.
21. Submit in Moodle three links: (1) your GitHub repo, (2) your landing page, and (3) your live drum kit.
   
