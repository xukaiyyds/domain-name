(function () {
  const loaded = document.querySelector(".loaded");
  const loadText = document.querySelector(".load-text");
  const twinkle = document.querySelector(".twinkle");
  const loading = setInterval(blurring, 30);
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };

  let load = 0;

  function blurring() {
    load++;

    loadText.innerText = `${load}%`;
    loadText.style.opacity = scale(load, 0, 100, 1, 0);

    if (load > 0) {
      loaded.classList.remove("display-none");
    }

    if (Boolean(sessionStorage.finished_loading)) {
      load = 100;
    }

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
    sessionStorage.setItem("finished_loading", "true");
    loaded.classList.add("display-none");
  }
})();
