(function () {
  /* 域名使用时长 */
  const timer = document.getElementById("timer");
  setInterval(updateTimer, 10000);
  updateTimer();

  function updateTimer() {
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - startTime.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const differenceInMonths = differenceInDays / 30;
    const differenceInYears = differenceInMonths / 12;

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

  /* 域名剩余时长 */
  const countdown = document.getElementById("countdown");
  const clearCountdown = setInterval(updateCountdown, 1000);
  updateCountdown();

  function updateCountdown() {
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    const targetTime = endTime.getTime();
    const remainingTime = targetTime - currentTime;
    let years = Math.floor(remainingTime / (1000 * 60 * 60 * 24 * 365));
    let months = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );
    let days = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    let hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    if (Boolean(localStorage.convert_days)) {
      days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      // 到期
      expireColorPrompt();
      if (remainingTime <= 0) {
        clearInterval(clearCountdown);
        return (countdown.innerHTML = "0 天 00 小时 00 分钟 00 秒");
      }
      return (countdown.innerHTML = `${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`);
    }

    if (years >= 1) {
      return (countdown.innerHTML = `${years} 年 ${months} 月 ${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`);
    } else if (months >= 1) {
      return (countdown.innerHTML = `${months} 月 ${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`);
    } else {
      // 到期
      expireColorPrompt();
      if (remainingTime <= 0) {
        clearInterval(clearCountdown);
        return (countdown.innerHTML = "0 天 00 小时 00 分钟 00 秒");
      }
      return (countdown.innerHTML = `${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`);
    }

    // 到期颜色提醒
    function expireColorPrompt() {
      if (days < 30) {
        countdown.classList.add("countdown-blue");
      }
      if (days < 7) {
        countdown.classList.remove("countdown-blue");
        countdown.classList.add("countdown-yellow");
      }
      if (remainingTime <= 0) {
        countdown.classList.remove("countdown-yellow");
        countdown.classList.add("countdown-red");
      }
    }
  }
})();
