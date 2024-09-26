(function () {
  /* 弹窗默认设置 */
  iziToast.settings({
    timeout: 2000,
    closeOnEscape: true,
    displayMode: 1,
    layout: 2,
    position: "topLeft",
    transitionIn: "bounceInRight",
    transitionOut: "fadeOutLeft",
    theme: "light",
  });

  /* 域名到期预警 */
  Boolean(sessionStorage.expiration_warning)
    ? ""
    : window.addEventListener("load", domainExpirationWarning);

  function domainExpirationWarning() {
    sessionStorage.setItem("expiration_warning", "true");
    setTimeout(function () {
      if (countdown.classList.contains("countdown-blue")) {
        iziToast.show({
          timeout: 3000,
          title: "温馨提醒",
          titleLineHeight: 20,
          message: "域名剩余时长已不足 30 天",
          icon: "iconfont icon-remind",
          color: "blue",
        });
      }
      if (countdown.classList.contains("countdown-yellow")) {
        iziToast.show({
          timeout: 4000,
          title: "温馨提醒",
          titleLineHeight: 20,
          message: "域名剩余时长已不足 7 天，请及时续费",
          icon: "iconfont icon-remind",
          color: "yellow",
        });
      }
      if (countdown.classList.contains("countdown-red")) {
        iziToast.show({
          timeout: 5000,
          title: "温馨提醒",
          titleLineHeight: 20,
          message: `域名已到期，请前往${cloud.textContent}进行续费`,
          icon: "iconfont icon-remind",
          color: "red",
        });
      }
    }, 3000);
  }

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

  /* 复制链接 */
  document.getElementById("copy-url").addEventListener("click", async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      iziToast.show({
        title: "复制成功",
        titleLineHeight: 20,
        message: "分享链接已拷贝到剪贴板",
        icon: "iconfont icon-copy-success",
        color: "green",
        displayMode: "replace",
      });
    } catch (err) {
      console.log("复制失败:", err);
    }
  });

  /* 导航菜单 */
  document.querySelector(".nav").addEventListener("click", () => {
    iziToast.show({
      timeout: false,
      title: "个性化配置",
      titleLineHeight: 22,
      icon: "iconfont icon-nav-menu",
      closeOnEscape: false,
      progressBar: false,
      drag: false,
      position: "center",
      transitionIn: "fadeInDown",
      transitionOut: "fadeOut",
      overlay: true,
      overlayColor: "rgba(0, 0, 0, 0.8)",
      theme: "dark",
      buttons: [
        [
          "<button class='light-theme'><i class='iconfont icon-light-theme'></i> <span>启用主题</span></button>",
          function (instance, toast) {},
        ],
        [
          "<button class='share-links'><i class='iconfont icon-share'></i> <span>开启分享</span></button>",
          function (instance, toast) {},
        ],
        [
          "<button class='hide-background'><i class='iconfont icon-hide-background'></i> <span>隐藏背景</span></button>",
          function (instance, toast) {},
        ],
        [
          "<button class='full-screen'><i class='iconfont icon-full-screen'></i> <span>全屏模式</span></button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "flipOutX" }, toast, "button");
          },
        ],
        [
          "<button><i class='iconfont icon-close'></i> 关闭菜单</button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          },
        ],
      ],
    });
    ThemeSwitch();
    shareSwitch();
    hideBackgroundSwitch();
    fullScreenSwitch();
  });

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

  const darkmodeLayer = document.querySelector(".darkmode-layer");
  const darkmodeToggle = document.querySelector(".darkmode-toggle");
  let getDarkmodes = Boolean(localStorage.getItem("darkmodes"));

  if (getDarkmodes) {
    darkmodeLayer.style.zIndex = 0;
    darkmodeToggle.style.zIndex = 1;
  } else {
    darkmodeLayer.style.zIndex = -1;
    darkmodeToggle.style.zIndex = -1;
  }

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

  /* 主题开关 */
  function ThemeSwitch() {
    const lightTheme = document.querySelector(".light-theme");

    if (getDarkmodes) {
      lightTheme.children[1].textContent = "禁用主题";
    } else {
      lightTheme.children[1].textContent = "启用主题";
    }

    lightTheme.addEventListener("click", () => {
      if (darkmodeToggle.style.zIndex === "-1") {
        iziToast.show({
          timeout: false,
          message: "是否启用浅色主题？",
          icon: "ico-question",
          layout: 1,
          balloon: true,
          close: false,
          progressBar: false,
          position: "bottomLeft",
          transitionIn: "bounceInUp",
          transitionOut: "fadeOutUp",
          buttons: [
            [
              "<button>启用</button>",
              function (instance, toast) {
                localStorage.setItem("darkmodes", "true");
                getDarkmodes = Boolean(localStorage.getItem("darkmodes"));

                if (getDarkmodes) {
                  darkmodeLayer.style.zIndex = 0;
                  darkmodeToggle.style.zIndex = 1;
                  iziToast.show({
                    title: "已启用",
                    icon: "ico-success",
                    color: "green",
                  });
                  Boolean(sessionStorage.theme_info_remind)
                    ? ""
                    : setTimeout(function () {
                        sessionStorage.setItem("theme_info_remind", "true");
                        iziToast.show({
                          message: "请在页面右下角切换主题",
                          icon: "iconfont icon-info-remind",
                          color: "blue",
                          transitionIn: "bounceInDown",
                        });
                      }, 1500);
                  lightTheme.children[1].textContent = "禁用主题";
                }

                instance.hide(
                  {
                    transitionOut: "fadeOutLeft",
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
        if (darkmode.isActivated()) {
          iziToast.show({
            timeout: 3000,
            title: "温馨提示",
            titleLineHeight: 20,
            message: "无法禁用！请先切换到深色主题",
            icon: "ico-warning",
            color: "yellow",
          });
        } else {
          iziToast.show({
            timeout: false,
            message: "是否禁用浅色主题？",
            icon: "ico-question",
            layout: 1,
            balloon: true,
            close: false,
            progressBar: false,
            position: "bottomLeft",
            transitionIn: "bounceInUp",
            transitionOut: "fadeOutUp",
            buttons: [
              [
                "<button>禁用</button>",
                function (instance, toast) {
                  localStorage.removeItem("darkmodes");
                  getDarkmodes = Boolean(localStorage.getItem("darkmodes"));

                  if (!getDarkmodes) {
                    darkmodeLayer.style.zIndex = -1;
                    darkmodeToggle.style.zIndex = -1;
                    iziToast.show({
                      title: "已禁用",
                      icon: "ico-error",
                      color: "green",
                    });
                    lightTheme.children[1].textContent = "启用主题";
                  }

                  instance.hide(
                    {
                      transitionOut: "fadeOutLeft",
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
        }
      }
    });
  }

  /* 分享开关 */
  const shareComponent = document.querySelector(".share-component");
  let getShareLinks = Boolean(Number(localStorage.getItem("sharelinks")));

  getShareSwitch();
  function getShareSwitch() {
    if (getShareLinks) {
      shareComponent.classList.remove("display-none");
      shareComponent.classList.add("social-share-mend");
    }
  }

  function shareSwitch() {
    const shareLinks = document.querySelector(".share-links");

    getShareSwitch();

    if (getShareLinks) {
      shareLinks.children[1].textContent = "关闭分享";
    }

    shareLinks.addEventListener("click", () => {
      if (shareComponent.classList.contains("display-none")) {
        iziToast.show({
          timeout: false,
          message: "是否开启分享功能？",
          icon: "ico-question",
          layout: 1,
          balloon: true,
          close: false,
          progressBar: false,
          position: "bottomLeft",
          transitionIn: "bounceInUp",
          transitionOut: "fadeOutUp",
          buttons: [
            [
              "<button>开启</button>",
              function (instance, toast) {
                localStorage.setItem("sharelinks", "1");
                getShareLinks = Boolean(
                  Number(localStorage.getItem("sharelinks"))
                );

                if (getShareLinks) {
                  shareComponent.classList.remove("display-none");
                  shareComponent.classList.add("social-share-mend");
                  iziToast.show({
                    title: "已开启",
                    icon: "iconfont icon-share-open",
                    color: "green",
                  });
                  Boolean(sessionStorage.share_info_remind)
                    ? ""
                    : setTimeout(function () {
                        sessionStorage.setItem("share_info_remind", "true");
                        iziToast.show({
                          message: "请在页面左下角进行分享",
                          icon: "iconfont icon-info-remind",
                          color: "blue",
                          transitionIn: "bounceInDown",
                        });
                      }, 1500);
                  shareLinks.children[1].textContent = "关闭分享";
                }

                instance.hide(
                  {
                    transitionOut: "fadeOutLeft",
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
          timeout: false,
          message: "是否关闭分享功能？",
          icon: "ico-question",
          layout: 1,
          balloon: true,
          close: false,
          progressBar: false,
          position: "bottomLeft",
          transitionIn: "bounceInUp",
          transitionOut: "fadeOutUp",
          buttons: [
            [
              "<button>关闭</button>",
              function (instance, toast) {
                localStorage.setItem("sharelinks", "0");
                getShareLinks = Boolean(
                  Number(localStorage.getItem("sharelinks"))
                );

                if (!getShareLinks) {
                  shareComponent.classList.remove("social-share-mend");
                  shareComponent.classList.add("display-none");
                  iziToast.show({
                    title: "已关闭",
                    icon: "iconfont icon-share-close",
                    color: "green",
                  });
                  shareLinks.children[1].textContent = "开启分享";
                }

                instance.hide(
                  {
                    transitionOut: "fadeOutLeft",
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
      }
    });
  }

  /* 背景开关 */
  const bg = document.querySelector(".bg");

  if (Boolean(localStorage.no_background_image)) {
    bg.classList.add("no-bg-image");
  } else {
    bg.classList.remove("no-bg-image");
  }

  function hideBackgroundSwitch() {
    const hideBackground = document.querySelector(".hide-background");

    if (Boolean(localStorage.no_background_image)) {
      hideBackground.children[1].textContent = "显示背景";
    }

    hideBackground.addEventListener("click", function () {
      if (bg.classList.contains("no-bg-image")) {
        localStorage.removeItem("no_background_image");
        bg.classList.remove("no-bg-image");
        iziToast.show({
          title: "已显示",
          icon: "iconfont icon-hide",
          color: "green",
        });
        hideBackground.children[1].textContent = "隐藏背景";
      } else {
        localStorage.setItem("no_background_image", "true");
        bg.classList.add("no-bg-image");
        iziToast.show({
          title: "已隐藏",
          icon: "iconfont icon-display",
          color: "green",
        });
        hideBackground.children[1].textContent = "显示背景";
      }
    });
  }
})();
