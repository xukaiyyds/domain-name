function updateCountdown() {
  let current = new Date(); // 获取当前时间
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
  // let target = new Date("2023/10/16 21:45:32"); // 设置目标时间
  let currentTime = current.getTime();
  let targetTime = target.getTime();
  let remainingTime = targetTime - currentTime;

  // 将毫秒转换为天、小时、分钟和秒
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

  // 更新倒计时显示
  document.getElementById("countdown").innerHTML =
    days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒";

  // 当剩余时间为0时，清除定时器
  if (remainingTime <= 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML = "倒计时结束，你该续费啦！";
    document.getElementById("countdown").style.color = "#F56C6C";
  }
}

// 每秒钟更新一次倒计时
let timer = setInterval(updateCountdown, 1000);
