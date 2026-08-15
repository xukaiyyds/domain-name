(function () {
  /* 弹窗默认设置 */
  iziToast.settings({
    timeout: 2000,
    close: false,
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
          close: true,
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
          close: true,
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
          close: true,
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
      close: true,
      closeOnEscape: false,
      progressBar: false,
      drag: false,
      position: "center",
      transitionIn: "fadeInDown",
      transitionOut: "fadeOut",
      overlay: true,
      // overlayColor: "rgba(0, 0, 0, 0.8)",
      theme: "dark",
      buttons: [
        [
          "<button class='light-theme'><i class='iconfont icon-light-theme'></i> <span>启用主题</span></button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "flipOutX" }, toast, "button");
          },
        ],
        [
          "<button class='share-links'><i class='iconfont icon-share'></i> <span>开启分享</span></button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "flipOutX" }, toast, "button");
          },
        ],
        [
          "<button class='translation'><i class='iconfont icon-translation'></i> <span>英汉翻译</span></button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "flipOutX" }, toast, "button");
          },
        ],
        [
          "<button class='date-conversion'><i class='iconfont icon-date-conversion'></i> <span>日期转换</span></button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "flipOutX" }, toast, "button");
          },
        ],
        [
          "<button class='hide-background'><i class='iconfont icon-hide-background'></i> <span>隐藏背景</span></button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "flipOutX" }, toast, "button");
          },
        ],
        [
          "<button class='full-screen'><i class='iconfont icon-full-screen'></i> <span>全屏模式</span></button>",
          function (instance, toast) {
            instance.hide({ transitionOut: "flipOutX" }, toast, "button");
          },
        ],
        // [
        //   "<button><i class='iconfont icon-close'></i> 关闭菜单</button>",
        //   function (instance, toast) {
        //     instance.hide({ transitionOut: "fadeOut" }, toast, "button");
        //   },
        // ],
      ],
    });
    ThemeSwitch();
    shareSwitch();
    translationSwitch();
    dateConversionSwitch();
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
            close: true,
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

  /* 隐藏背景开关 */
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

  /* 日期转换开关 */
  function dateConversionSwitch() {
    const dateConversion = document.querySelector(".date-conversion");

    dateConversion.addEventListener("click", function () {
      if (Boolean(localStorage.convert_days)) {
        localStorage.removeItem("convert_days");
        iziToast.show({
          message: "已转换为年月日形式",
          icon: "iconfont icon-days-conversion",
          color: "green",
        });
      } else {
        localStorage.setItem("convert_days", "true");
        iziToast.show({
          message: "已转换为天数形式",
          icon: "iconfont icon-days-conversion",
          color: "green",
        });
      }
    });
  }

  /* 英汉翻译开关 */
  function translationSwitch() {
    const translation = document.querySelector(".translation");

    translation.addEventListener("click", function () {
      if (Boolean(localStorage.translations)) {
        localStorage.removeItem("translations");
        Chinese();
        iziToast.show({
          message: "已切换为中文",
          icon: "iconfont icon-zhongwen",
          color: "green",
        });
      } else {
        localStorage.setItem("translations", "true");
        English();
        iziToast.show({
          message: "Switched to English",
          icon: "iconfont icon-yingwen",
          color: "green",
        });
      }
    });
  }

  /* 域名证书声明 */
  document.querySelector(".statement").addEventListener("click", () => {
    iziToast.question({
      timeout: false,
      overlay: true,
      displayMode: 'once',
      position: 'center',
      transitionIn: 'fadeIn',
      icon: 'iconfont icon-dragon',
      iconColor: '#D9534F',
      // 请自行修改
      title: '本证书由中国顶级域名权威机构 CNNIC（China Internet Network Information Center）授权 广州云讯信息科技有限公司（Guangzhou Yunxun Information Technology Co.，Ltd.）制作并颁发。',
      titleColor: '#F0AD4E',
      titleSize: '1.25rem',
      titleLineHeight: '2',
      buttons: [
        ['<button>查看详情</button>', function (instance, toast) {

          instance.hide({ transitionOut: 'fadeOutUp' }, toast, 'button');
          iziToast.info({
            timeout: false,
            overlay: true,
            icon: false,
            displayMode: 'once',
            position: 'center',
            transitionIn: 'bounceInUp',
            message: `<p>1. 本证书表明证书上列出的个人或组织为所列出域名的合法注册人，该注册人依法享有该域名下之各项权利。</p>
                      <p>2. 本证书并不表明域名所属注册机构对本证书所列域名是否贬斥、侵害或毁损任何第三人之合法机利或利益作出任何明示或默示之评判、确认、担保，或作出其它任何形式之意思表示。域名所属注册机构亦无任何责任或义务作出上述之评判、确认、担保，或作出其它任何形式之意思表示。</p>
                      <p>3. 若域名被转让、转出域名所属注册机构、被删除或发生其他改变域名状态及所有人信息的情况，则本证书不再具有证明效力。</p>
                      <p>4. 腾讯云域名注册服务由腾讯云计算（北京）有限责任公司（TencentCloud Computing(Beijing）LimitedLiabilityCompany）、烟台帝思普网络科技有限公司（DNSPod,Inc.）、广州云讯信息科技有限公司（Guang zhouYunxun Information Technology Co.,Ltd.)提供，上述公司及品牌均为腾讯云公司所有。</p>`,
            messageColor: '#428BCA',
            messageSize: '1rem',
            messageLineHeight: '20',
            buttons: [
              ['<button>我已知晓</button>', function (instance, toast) {

                instance.hide({ transitionOut: 'fadeOutDown' }, toast, 'button');

              }, true],
            ],
          });
        }],
        ['<button><b>我已知晓</b></button>', function (instance, toast) {

          instance.hide({ transitionOut: 'fadeOutDown' }, toast, 'button');

        }, true],
      ],
    });
  });
})();
