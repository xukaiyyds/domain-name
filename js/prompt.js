(function () {
  /* 默认设置 */
  iziToast.settings({
    timeout: 2000,
    closeOnEscape: true,
    displayMode: 1,
    layout: 2,
    position: "topLeft",
    transitionIn: "bounceInRight",
    transitionOut: "fadeOutLeft",
  });

  /* 分享开关 */
  const shareLinks = document.querySelector(".share-links");
  const shareComponent = document.querySelector(".share-component");
  let getShareSwitch = Boolean(Number(localStorage.getItem("sharelinks")));

  if (getShareSwitch) {
    shareComponent.classList.remove("display-none");
    shareLinks.title = "关闭分享";
  } else {
    shareComponent.classList.add("display-none");
  }

  shareLinks.onclick = function () {
    if (shareComponent.classList.contains("display-none")) {
      iziToast.show({
        timeout: false,
        title: "是否开启分享功能？",
        icon: "iconfont icon-problem",
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
              localStorage.setItem("sharelinks", "1");
              getShareSwitch = Boolean(
                Number(localStorage.getItem("sharelinks"))
              );

              if (getShareSwitch) {
                shareComponent.classList.remove("display-none");
                iziToast.show({
                  title: "已开启",
                  icon: "iconfont icon-share-open",
                  color: "yellow",
                });
                setTimeout(function () {
                  iziToast.show({
                    message: "请在页面左下角进行分享",
                    icon: "iconfont icon-info-remind",
                    color: "blue",
                    transitionIn: "bounceInDown",
                  });
                }, 1500);
                shareLinks.title = "关闭分享";
              }

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
                  transitionOut: "fadeOutUp",
                },
                toast
              );
            },
          ],
        ],
      });
    } else {
      iziToast.show({
        timeout: false,
        title: "是否关闭分享功能？",
        icon: "iconfont icon-problem",
        layout: 1,
        close: false,
        drag: false,
        position: "center",
        transitionIn: "bounceInDown",
        transitionOut: "fadeOutDown",
        overlay: true,
        overlayColor: "rgba(0, 0, 0, 0.8)",
        theme: "light",
        buttons: [
          [
            "<button>关闭</button>",
            function (instance, toast) {
              localStorage.setItem("sharelinks", "0");
              getShareSwitch = Boolean(
                Number(localStorage.getItem("sharelinks"))
              );

              if (!getShareSwitch) {
                shareComponent.classList.add("display-none");
                iziToast.show({
                  title: "已关闭",
                  icon: "iconfont icon-share-close",
                  color: "yellow",
                });
                shareLinks.title = "开启分享";
              }

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
                  transitionOut: "fadeOutUp",
                },
                toast
              );
            },
          ],
        ],
      });
    }
  };

  /* 复制提醒 */
  document.addEventListener("copy", function (e) {
    const clipboardData = e.clipboardData || window.clipboardData;
    if (!clipboardData) return;
    const text = window.getSelection().toString();
    if (text) {
      e.preventDefault();
      clipboardData.setData("text/plain", text);
      iziToast.show({
        title: "复制成功",
        titleLineHeight: 20,
        message: `请尊重域名所有者${name[0].textContent}的版权信息`,
        icon: "iconfont icon-copy-success",
        color: "green",
        displayMode: "replace",
      });
    }
  });
})();
