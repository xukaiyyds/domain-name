(function () {
  /* 域名使用时长 */
  function updateTimer() {
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - startTime.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const differenceInMonths = differenceInDays / 30;
    const differenceInYears = differenceInMonths / 12;
    const timer = document.getElementById("timer");
    if (differenceInYears >= 1) {
      return (timer.innerHTML = `${Math.floor(
        differenceInYears
      )} 年 ${Math.floor(differenceInMonths % 12)} 月 ${Math.round(
        differenceInDays % 30
      )} 天`);
    } else if (differenceInMonths >= 1) {
      return (timer.innerHTML = `${Math.floor(
        differenceInMonths
      )} 月 ${Math.round(differenceInDays % 30)} 天`);
    } else {
      return (timer.innerHTML = `${Math.round(differenceInDays)} 天`);
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);

  /* 域名剩余时长 */
  function updateCountdown() {
    let current = new Date();
    let currentTime = current.getTime();
    let targetTime = endTime.getTime();
    let remainingTime = targetTime - currentTime;

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

    let countdown = document.getElementById("countdown");
    countdown.innerHTML = `${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`;
    if (days < 30) {
      countdown.style.color = "#4772fa";
    }
    if (days < 7) {
      countdown.style.color = "#ffb000";
    }
    if (remainingTime <= 0) {
      clearInterval(timer);
      countdown.style.color = "#e03131";
      countdown.textContent = "域名到期了，你该续费啦！";
    }
  }

  let timer = setInterval(updateCountdown, 1000);
})();
