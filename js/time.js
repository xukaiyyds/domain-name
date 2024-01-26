(function () {
  /* 域名使用总时长 */
  function updateTimer() {
    let now = new Date();
    let timeDiff = now - start;
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    let years = Math.floor(days / 365);
    let months = Math.floor((days % 365) / 30); // 大约几个月
    let remainingDays = days - years * 365 - months * 30;
    let hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    document.getElementById("timer").innerHTML =
      years +
      " 年 " +
      months +
      " 个月 " +
      remainingDays +
      " 天 " +
      hours +
      " 小时 ";
  }

  updateTimer();
  setInterval(updateTimer, 1000);

  /* 域名续费倒计时 */
  function updateCountdown() {
    let current = new Date();
    let year = current.getFullYear();
    let month = current.getMonth() + 1;
    if (String(month).length === 1) {
      month = "0" + month;
    }
    let date = current.getDate();
    if (String(date).length === 1) {
      date = "0" + date;
    }
    document.getElementById("print").innerHTML =
      year + " 年 " + month + " 月 " + date + " 日";
    let currentTime = current.getTime();
    let targetTime = end.getTime();
    let remainingTime = targetTime - currentTime;

    /* 将毫秒转换为天、小时、分钟和秒 */
    let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    if (String(hours).length === 1) {
      hours = "0" + hours;
    }
    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    if (String(minutes).length === 1) {
      minutes = "0" + minutes;
    }
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    if (String(seconds).length === 1) {
      seconds = "0" + seconds;
    }

    document.getElementById("countdown").innerHTML =
      days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒";

    if (days < 30) {
      document.getElementById("countdown").style.padding = "4px";
      document.getElementById("countdown").style.backgroundColor = "#4772fa";
    }

    if (days < 7) {
      document.getElementById("countdown").style.backgroundColor = "#ffb000";
    }

    if (remainingTime <= 0) {
      clearInterval(timer);
      document.getElementById("countdown").textContent =
        "倒计时结束，你该续费啦！";
      document.getElementById("countdown").style.backgroundColor = "#e03131";
    }
  }

  let timer = setInterval(updateCountdown, 1000);
})();
