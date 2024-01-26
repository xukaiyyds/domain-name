const bg = document.querySelector(".bg");
const loadText = document.querySelector(".load-text");
const container = document.querySelector(".container");
const githubCorner = document.querySelector(".github-corner");

let load = 0;

let int = setInterval(blurring, 30);

function blurring() {
  load++;

  if (load > 99) {
    clearInterval(int);
    loadText.style.display = "none";
    container.style.cssText = "display: block; animation: blink 1s;";
    githubCorner.style.cssText = "display: block; animation: blink 2s;";
  }

  loadText.innerText = `${load}%`;
  loadText.computedStyleMap.opacity = scale(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
