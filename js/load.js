const loaded = document.querySelector(".loaded");
const loadText = document.querySelector(".load-text");
const twinkle = document.querySelector(".twinkle");
const container = document.querySelector(".container");

let load = 0;

let loading = setInterval(blurring, 30);

function blurring() {
  load++;
  loadText.innerText = `${load}%`;
  loadText.style.opacity = scale(load, 0, 100, 1, 0);

  if (load > 9) {
    twinkle.classList.add("display-block");
  }
  if (load > 99) {
    clearInterval(loading);
    loaded.classList.add("display-none");
    container.classList.add("display-block");
    container.style.cssText = "animation: smooth 1s;";
  }

  loaded.addEventListener("click", () => {
    twinkle.classList.add("display-none");
    load = 90;
  });
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
