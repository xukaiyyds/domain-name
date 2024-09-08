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

  if (load > 20) {
    twinkle.classList.remove("display-none");
    loaded.addEventListener("click", () => {
      loadComplete();
    });
  }

  if (load > 99) {
    loadComplete();
  }
}

function loadComplete() {
  clearInterval(loading);
  loaded.classList.add("display-none");
  container.classList.remove("display-none");
}

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
