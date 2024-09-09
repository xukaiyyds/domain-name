(function () {
  /* 明暗切换 */
  const options = {
    bottom: "1rem",
    right: "1rem",
    left: "unset",
    time: "0s",
    mixColor: "#fff",
    backgroundColor: "#fff",
    buttonColorDark: "#f3f5f8",
    buttonColorLight: "#151513",
    saveInCookies: true,
    label: "🌓",
    autoMatchOsTheme: true,
  };

  const darkmode = new Darkmode(options);
  darkmode.showWidget();

  const darkmodeToggle = document.querySelector(".darkmode-toggle");

  switchState();

  function switchState() {
    if (darkmode.isActivated()) {
      darkmodeToggle.textContent = "🌙";
    } else {
      darkmodeToggle.textContent = "☀️";
    }
  }

  darkmodeToggle.addEventListener("click", function () {
    switchState();
  });

  /* 全屏显示 */
  const fullScreen = document.querySelector(".full-screen");

  fullScreen.addEventListener("click", function () {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", function () {
    if (document.fullscreenElement) {
      fullScreen.title = "退出全屏";
    } else {
      fullScreen.title = "进入全屏";
    }
  });

  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen =
      document.documentElement.requestFullscreen ||
      document.documentElement.webkitRequestFullscreen ||
      document.documentElement.mozRequestFullscreen ||
      document.documentElement.msRequestFullscreen;
    document.exitFullscreen =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozExitFullscreen ||
      document.msExitFullscreen;
  }

  /* 开源不易，以下信息请不要修改哦 */
  console.log(
    "%c 顶级国际域名证书 %c Made by xukaiyyds %c",
    "background: #35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff",
    "background: #41b883; padding: 1px; border-radius: 0 3px 3px 0; color: #fff",
    "background: transparent"
  );
  console.log(
    "%c GitHub源代码仓库 %c https://github.com/xukaiyyds/domain-name %c",
    "background: #35495e; padding: 1px; border-radius: 3px 0 0 3px; color: #fff",
    "background: #41b883; padding: 1px; border-radius: 0 3px 3px 0; color: #fff",
    "background: transparent"
  );
})();
