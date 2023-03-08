import { WaveGroup } from "./waveGroup.js";
import { WaveData } from "./waveData.js";

// https://codepen.io/bitwitch/pen/rNLBbLp
// var w = window.innerWidth;
// var h = window.innerHeight;

// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");
// ctx.canvas.width = w;
// ctx.canvas.height = h;

// var start = performance.now();

// window.onresize = function() {
//   w = window.innerWidth;
//   h = window.innerHeight;
//   ctx.canvas.width = w;
//   ctx.canvas.height = h;
// }

// function drawSine(time, angular_freq) {
//   ctx.beginPath();
//   ctx.strokeStyle = "hsla(220,100%,50%,1)";

//   var elapsed = (time - start) / 1000; // in seconds
//   var phase_angle = elapsed / 1000;

//   var x, y, amplitude;
//   for (x=0; x<w; x++) {
//     amplitude = noise.perlin2(x/100, elapsed*0.5) * 100;
//     amplitude *= noise.simplex2(x/10, elapsed*0.35) * 3;
//     y = amplitude * Math.sin(x * angular_freq + phase_angle);
//     ctx.lineTo(x, y + (h/2));
//   }

//   ctx.stroke();
//   ctx.closePath();
// }

// function render(time) {
//   // clear screen
//   ctx.fillStyle="rgba(8,0,20,1)";
//   ctx.fillRect(0,0,w,h);
//   drawSine(time, 50); // angular_freq = 50
//   requestAnimationFrame(render)
// }

// //----------------------------------------------------------------------------
// noise.seed(Math.random());
// render();

export class App {
  constructor() {
    this.canvas = document.getElementById("waves");
    this.ctx = this.canvas.getContext("2d");
    this.waveGroup = null;

    window.addEventListener("resize", this.resize.bind(this), false);
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    if (this.waveGroup) this.waveGroup.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    if (this.waveGroup) this.waveGroup.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }

  initWavwGroup(waves) {
    this.waveGroup = new WaveGroup(waves);
    this.resize();
  }
}
let app = null;
window.onload = () => {
  app = new App();

  document.getElementById("wave1").onclick = onClickWave1;
  document.getElementById("wave2").onclick = onClickWave2;
  document.getElementById("wave3").onclick = onClickWave3;
  document.getElementById("wave4").onclick = onClickWave4;
  document.getElementById("wave5").onclick = onClickWave5;
  document.getElementById("wave6").onclick = onClickWave6;

  onClickWave1();
};

function onClickWave1() {
  const totalCurves = 13;
  const curveWidth = 120;
  const curveHeight = 200;
  const ease = false;
  const line = false;
  const waves = [
    //
    new WaveData(0, 0.01, totalCurves, curveWidth, curveHeight, ease, line),
    new WaveData(20, 0.01, totalCurves, curveWidth, curveHeight, ease, line),
  ];
  app.initWavwGroup(waves);
}
function onClickWave2() {
  const totalCurves = 12;
  const curveWidth = 120;
  const curveHeight = 300;
  const ease = true;
  const line = false;
  const waves = [
    //
    new WaveData(0, 0.01, totalCurves, curveWidth, curveHeight, ease, line),
    new WaveData(100, 0.01, totalCurves, curveWidth, curveHeight, ease, line),
  ];
  app.initWavwGroup(waves);
}
function onClickWave3() {
  const speed = 0.01;
  const totalCurves = 16;
  const curveWidth = 100;
  const curveHeight = 100;
  const ease = false;
  const line = false;
  const waves = [
    //
    new WaveData(0, 0.008, totalCurves, curveWidth, curveHeight, ease, line),
    new WaveData(20, 0.008, totalCurves, curveWidth, curveHeight, ease, line),
  ];
  app.initWavwGroup(waves);
}
function onClickWave4() {
  const speed = 0.01;
  const totalCurves = 25;
  const curveWidth = 70;
  const curveHeight = 500;
  const ease = true;
  const line = false;
  const waves = [
    //
    new WaveData(0, speed, totalCurves, curveWidth, curveHeight, ease, line),
    new WaveData(35, speed, totalCurves, curveWidth, curveHeight, ease, line),
  ];
  app.initWavwGroup(waves);
}
function onClickWave5() {
  const speed = 0.02;
  const totalCurves = 40;
  const curveWidth = 50;
  const curveHeight = 50;
  const ease = true;
  const line = true;
  const waves = [
    //
    new WaveData(0, speed, totalCurves, curveWidth, curveHeight, ease, line),
    new WaveData(20, speed, totalCurves, curveWidth, curveHeight, ease, line),
  ];
  app.initWavwGroup(waves);
}
function onClickWave6() {
  const speed = 0.02;
  const totalCurves = 60;
  const curveWidth = 30;
  const curveHeight = 250;
  const ease = true;
  const line = true;
  const waves = [
    //
    new WaveData(0, speed, totalCurves, curveWidth, curveHeight, ease, line),
    new WaveData(20, speed, totalCurves, curveWidth, curveHeight, ease, line),
  ];
  app.initWavwGroup(waves);
}
