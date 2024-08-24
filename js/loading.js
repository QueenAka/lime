console.clear();

const PI = Math.PI;
const RATE = 1.005;
const CVS = document.querySelector('canvas');
const CTX = CVS.getContext('2d');
const DI = Math.max(window.innerWidth, window.innerHeight);
CVS.width = DI;
CVS.height = DI;
const RAD = DI * 0.5;
const R = Math.sqrt(0.5);

const YEAR = 50;
const AGE = 25;

var points = [];
for (let i = 0; i < 750; i++)
  setTimeout(step, 0);

runner();

function step() {
  points = points.map(degradePoint);

  points.push(initialPoint());

  CTX.fillStyle = 'black';
  CTX.fillRect(0, 0, DI, DI);

  for (let i = points.length - 1; i >= 0; i--) {
    let [x, y, a, r, g] = points[i];
    let year = Math.ceil(g / YEAR);
    if (year < AGE) {
      let rat = (year / AGE);
      let rad = rat * 3;
      CTX.fillStyle = `rgb(255, 255, 255)`;
      CTX.beginPath();
      CTX.arc(x * DI + RAD, y * DI + RAD, rad, 0, 2 * PI);
      CTX.fill();
    } else points.splice(i, 1);
  }
}

function runner() {
  step();
  requestAnimationFrame(runner);
}

function initialPoint() {
  let angle = Math.random() * (PI * 2);
  return [0.5, 0.5, angle, 0.01, 0];
}

function degradePoint([x, y, angle, r, gen]) {
  r *= RATE;
  angle += 0.001;
  return [Math.cos(angle) * r, Math.sin(angle) * r, angle, r, gen + 1];
}

function endLoad() {
  document.querySelector('body').style.opacity = 0;
  document.cookie = "loaded=true; path=/";
  setTimeout(() => {
    window.location.href = "html/home.html";
  }, 500)
}