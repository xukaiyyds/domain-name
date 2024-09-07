/* 到期提醒 */
function remind() {
  setTimeout(function () {
    iziToast.error({
      timeout: 5000,
      title: "温馨提醒",
      titleLineHeight: 20,
      message: "域名到期了，你该续费啦！",
      icon: "iconfont icon-remind",
      position: "topLeft",
      transitionIn: "bounceInRight",
      transitionOut: "fadeOutLeft",
      layout: 2,
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
    iziToast.success({
      timeout: 2000,
      title: "复制成功",
      titleLineHeight: 20,
      message: `请尊重域名所有者${name[0].textContent}的版权信息`,
      icon: "iconfont icon-copy-success",
      position: "topLeft",
      transitionIn: "bounceInRight",
      transitionOut: "fadeOutLeft",
      layout: 2,
      displayMode: 0,
    });
  }
});

/* 开启分享 */
let shareLinks = document.querySelector(".share-links");
shareLinks.onclick = function () {
  let shareComponent = document.querySelector(".share-component");

  if (shareComponent.classList.contains("display-block")) {
    iziToast.show({
      timeout: 1500,
      icon: "iconfont icon-share-prompt",
      message: "请在页面左下角进行分享",
      position: "topLeft",
      transitionIn: "bounceInDown",
      transitionOut: "fadeOutLeft",
      displayMode: 2,
    });
  } else {
    iziToast.show({
      icon: "iconfont icon-wenhao",
      title: "确认要开启分享功能吗",
      position: "center",
      timeout: false,
      close: false,
      closeOnEscape: true,
      drag: false,
      overlay: true,
      overlayColor: "rgba(0, 0, 0, 0.8)",
      displayMode: 1,
      theme: "dark",
      buttons: [
        [
          "<button>确认</button>",
          function (instance, toast) {
            iziToast.success({
              timeout: 2000,
              title: "开启成功",
              titleLineHeight: 20,
              message: "请在页面左下角进行分享",
              icon: "iconfont icon-success",
              position: "topLeft",
              transitionIn: "bounceInRight",
              transitionOut: "fadeOutLeft",
              layout: 2,
            });
            shareComponent.classList.add("display-block");
            instance.hide(
              {
                transitionOut: "flipOutX",
              },
              toast,
              "buttonName"
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
              toast,
              "buttonName"
            );
          },
        ],
      ],
    });
  }
};
