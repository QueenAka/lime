function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

if (getCookie("loaded") == false) {
  window.location.href = ".."
}

const terminal = document.querySelector('div');

function typeEffect(text, t = "n", delay = 50) {
  let index = 0;
  const span = document.createElement('span');
  span.classList.add(t);
  terminal.appendChild(span);

  return new Promise((resolve) => {
    function type() {
      if (index < text.length) {
        span.textContent += text.charAt(index);
        index++;
        setTimeout(type, delay);
      } else {
        resolve();
      }
    }
    type();
  });
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function fade() {
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = "system.html";
  }, 100);
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

async function start() {
  await typeEffect("Checking environment...");
  if (isMobile()) {
    await wait(1000);
    await typeEffect("Mobile device detected. Please use a computer to access this system.", "e");
    await wait(1000);
    window.location.href = "..";
  }
  await wait(1000);
  await typeEffect(navigator.userAgent);
  await typeEffect("Checking for updates...");
  await wait(1500);
  await typeEffect("System is up to date.");
  await typeEffect("Checking user status...");
  const user = getCookie("user");
  if (!user || user == null || user != 814289490759778344) {
    await typeEffect("User data not found.", "e");
    await typeEffect("When prompted, type the user ID provided by the admin before accessing this system.");
    await wait(500);
    const uid = prompt("User ID:");
    if (uid != "814289490759778344") {
      await typeEffect("Invalid user ID.", "e");
      await wait(1000);
      window.location.href = "..";
    } else {
      document.cookie = "user=" + uid + "; path=/";
    }
  }
  await wait(1000);
  await typeEffect("Welcome back Lime.", "s");
  await wait(1000);
  await typeEffect("System is ready.", "s");
  await typeEffect("Booting into LimeOS...");
  await wait(1000);
  fade();
}
start();
