const canvas = document.getElementById("canvas");
if (!canvas) {
   alert("Ups! You injected a script before the html mark up was added!")
}
const ctx = canvas.getContext("2d");

const w = canvas.width = document.body.offsetWidth;
const h = canvas.height = document.body.offsetHeight;
const size = 15;
const cols = Math.floor(w / size) + 1;
const ypos = Array(cols).fill(0);

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, w, h);

function drawWallpaper () {
    const phraseEl = document.getElementById("phrase");
    const phrase = phraseEl.value || "Hello";
    const phraseLetters = phrase
        .split('')
        .filter((letter, i, text) => text.indexOf(letter) === i)
        .filter(l => l !== " ");

    ctx.fillStyle = "#0001";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#00FFFF";
    ctx.font = "15pt monospace";

    ypos.forEach((y, index) => {
        const text = phraseLetters[Math.round(Math.random() * (phraseLetters.length - 1))]
        const x = index * size;
        ctx.fillText(text, x, y);
        ypos[index] = (y > 100 + Math.random() * 10000)
            ? 0
            : y + size;
    });
}

window.setInterval(drawWallpaper, 25);