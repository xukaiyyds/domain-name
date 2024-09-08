/* 弹窗默认设置 */
iziToast.settings({
  timeout: 2000,
  closeOnEscape: true,
  displayMode: "replace",
  layout: 2,
  position: "topLeft",
  transitionIn: "bounceInRight",
  transitionOut: "fadeOutLeft",
});

/* 到期提醒 */
function remind() {
  setTimeout(function () {
    iziToast.show({
      timeout: 5000,
      title: "温馨提醒",
      titleLineHeight: 20,
      message: "域名到期了，你该续费啦！",
      icon: "iconfont icon-remind",
      color: "red",
    });
  }, 3000);
}

/* 复制提醒 */
document.addEventListener("copy", function (e) {
  let clipboardData = e.clipboardData || window.clipboardData;
  if (!clipboardData) return;
  let text = window.getSelection().toString();
  if (text) {
    e.preventDefault();
    clipboardData.setData("text/plain", text);
    iziToast.show({
      title: "复制成功",
      titleLineHeight: 20,
      message: `请尊重域名所有者${name[0].textContent}的版权信息`,
      icon: "iconfont icon-copy-success",
      color: "green",
    });
  }
});

/* 开启分享 */
let shareLinks = document.querySelector(".share-links");
shareLinks.onclick = function () {
  let shareComponent = document.querySelector(".share-component");

  if (shareComponent.classList.contains("display-none")) {
    iziToast.show({
      timeout: false,
      title: "是否开启分享功能？",
      icon: "iconfont icon-wenhao",
      displayMode: "once",
      layout: 1,
      close: false,
      drag: false,
      position: "center",
      transitionIn: "bounceInDown",
      transitionOut: "fadeOutDown",
      overlay: true,
      overlayColor: "rgba(0, 0, 0, 0.8)",
      theme: "dark",
      buttons: [
        [
          "<button>开启</button>",
          function (instance, toast) {
            shareComponent.classList.remove("display-none");
            iziToast.show({
              title: "开启成功",
              titleLineHeight: 20,
              message: "请在页面左下角进行分享",
              icon: "iconfont icon-success",
              color: "green",
            });
            instance.hide(
              {
                transitionOut: "flipOutX",
              },
              toast
            );
          },
          true,
        ],
        [
          "<button>取消</button>",
          function (instance, toast) {
            instance.hide(
              {
                transitionOut: "fadeOutDown",
              },
              toast
            );
          },
        ],
      ],
    });
  } else {
    iziToast.show({
      timeout: 1500,
      message: "请在页面左下角进行分享",
      icon: "iconfont icon-share-prompt",
      displayMode: "once",
      layout: 1,
      close: false,
      progressBar: false,
      position: "topCenter",
      transitionIn: "bounceInDown",
      transitionOut: "fadeOutUp",
    });
  }
};
