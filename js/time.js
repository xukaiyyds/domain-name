(function () {
  /* 域名使用时长 */
  const timer = document.getElementById("timer");
  setInterval(updateTimer, 10000);
  updateTimer();

  function updateTimer() {
    const currentDate = new Date();
    let years = currentDate.getFullYear() - startTime.getFullYear();
    let months = currentDate.getMonth() + 1 - (startTime.getMonth() + 1);
    let days = currentDate.getDate() - startTime.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastDayOfStartMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      months--;
      days += lastDayOfStartMonth;
    }

    if (years >= 1) {
      return (timer.innerHTML = `${years} 年 ${months} 月 ${days} 天`);
    } else if (months >= 1) {
      return (timer.innerHTML = `${months} 月 ${days} 天`);
    } else {
      return (timer.innerHTML = `${days} 天`);
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
    let years = endTime.getFullYear() - currentDate.getFullYear();
    let months = endTime.getMonth() + 1 - (currentDate.getMonth() + 1);
    let days = endTime.getDate() - currentDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastDayOfStartMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getDate();
      months--;
      days += lastDayOfStartMonth;
    }

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
      return (countdown.innerHTML = `${years} 年 ${months} 月 ${days} 天`);
    } else if (months >= 1) {
      return (countdown.innerHTML = `${months} 月 ${days} 天`);
    } else {
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
