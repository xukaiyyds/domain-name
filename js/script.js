/* 全屏显示 */
function fullScreenSwitch() {
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
      console.log("进入全屏模式");
    } else {
      console.log("退出全屏模式");
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
