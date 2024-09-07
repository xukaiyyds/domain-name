/* 明暗切换 */
function addDarkmodeWidget() {
  // 配置项：
  const options = {
    bottom: "16px", // 定位底部距离 default: '32px'
    right: "8px", // 定位右边距离 default: '32px'
    left: "unset", // 定位左边距离 default: 'unset'
    time: "0s", // 默认动画时间 default: '0.3s'
    mixColor: "#fff", // 需要改变的颜色 default: '#fff'
    backgroundColor: "#fff", // 背景颜色 default: '#fff'
    buttonColorDark: "#f3f5f8", // 黑暗模式下按钮颜色 default: '#100f2c'
    buttonColorLight: "#151513", // 日间模式下按钮颜色 default: '#fff'
    saveInCookies: true, // 是否在cookie保存当前模式 default: true,
    label: "", // 切换模式按钮图标 default: ''
    autoMatchOsTheme: true, // 是否自动根据系统适应模式 default: true
  };

  const darkmode = new Darkmode(options);
  darkmode.showWidget(); // 启用暗模式
  // darkmode.toggle(); // 禁用暗模式

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
}
window.addEventListener("load", addDarkmodeWidget);

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
