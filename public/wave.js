import { Point } from "./point.js";

export class Wave {
  constructor(index, waveData) {
    this.index = index;
    this.offset = waveData.offset;
    this.speed = waveData.speed;
    this.totalCurves = waveData.totalCurves;
    this.totalPoints = this.totalCurves * 2 - 1;
    this.curveWidth = waveData.curveWidth;
    this.curveHeight = waveData.curveHeight;
    this.ease = this.totalPoints > 2 ? waveData.ease : false;
    this.line = waveData.line;

    this.startPoints = [];
    this.endPoints = [];
    this.points = [];
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.init();
  }

  init() {
    this.startPoints = [];
    this.endPoints = [];
    this.points = [];

    const totalWidth = this.curveWidth * this.totalCurves;
    const spaceWidth_half = (this.stageWidth - totalWidth) / 2;
    this.pointGap = this.curveWidth / 2;

    this.startPoints[0] = new Point(0, 0, this.centerY);
    this.startPoints[1] = new Point(0, spaceWidth_half, this.centerY);
    this.endPoints[0] = new Point(0, spaceWidth_half + totalWidth, this.centerY);
    this.endPoints[1] = new Point(0, this.stageWidth, this.centerY);

    for (let i = 0; i < this.totalPoints; ++i) {
      const degree = (i / 2) % 2 == 0 ? 0 : Math.PI;

      const x = spaceWidth_half + this.pointGap * (i + 1) + this.index * this.offset;
      let height = this.curveHeight;
      if (this.ease) {
        const center = this.totalPoints / 2.0;
        const dist = Math.abs(i + 1 - center);
        const weight = Math.max(1.0 - dist / center);
        height = height * weight;
      }
      const point = new Point(degree, x, this.centerY, height, this.speed);
      this.points[i] = point;
    }
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";

    ctx.moveTo(this.startPoints[0].x, this.startPoints[0].y);
    ctx.lineTo(this.startPoints[1].x, this.startPoints[1].y);

    if (this.line) {
      for (let i = 0; i < this.points.length; ++i) {
        if (i % 2 == 0) {
          this.points[i].update();
        }
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }

      ctx.lineTo(this.endPoints[0].x, this.endPoints[0].y);
      ctx.lineTo(this.endPoints[1].x, this.endPoints[1].y);
    } else {
      const lastIndex = this.points.length - 1;
      for (let i = 0; i < lastIndex; i += 2) {
        this.points[i].update();
        ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, this.points[i + 1].x, this.points[i + 1].y);
      }

      this.points[lastIndex].update();
      ctx.quadraticCurveTo(this.points[lastIndex].x, this.points[lastIndex].y, this.endPoints[0].x, this.endPoints[0].y);
      ctx.lineTo(this.endPoints[1].x, this.endPoints[1].y);
    }

    ctx.stroke();
    ctx.closePath();
  }
  // draw(ctx) {
  //   ctx.beginPath();
  //   ctx.lineWidth = 3;
  //   ctx.strokeStyle = "white";

  //   // ctx.moveTo(0, 500);
  //   // ctx.lineTo(500, 500);
  //   // console.log(this.startPoints[1].x);

  //   ctx.moveTo(this.startPoints[0].x, this.startPoints[0].y);
  //   ctx.lineTo(this.startPoints[1].x, this.startPoints[1].y);
  //   this.points[0].update();
  //   this.points[2].update();
  //   // ctx.quadraticCurveTo(this.points[0].x, this.points[0].y, this.endPoints[0].x, this.endPoints[0].y);
  //   ctx.quadraticCurveTo(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
  //   // ctx.arc(this.points[0].x, this.points[0].y, 10, 0, 2 * Math.PI);
  //   // ctx.quadraticCurveTo(this.startPoints[1].x, this.startPoints[1].y, (this.startPoints[1].x + this.points[0].x) / 2, (this.startPoints[1].y + this.points[0].y) / 2);
  //   ctx.quadraticCurveTo(this.points[2].x, this.points[2].y, this.endPoints[0].x, this.endPoints[0].y);
  //   // ctx.quadraticCurveTo(this.points[1].x, this.points[1].y, this.endPoints[0].x, this.endPoints[0].y);
  //   // ctx.arc(this.points[1].x, this.points[1].y, 10, 0, 2 * Math.PI);
  //   ctx.lineTo(this.endPoints[1].x, this.endPoints[1].y);
  //   // let prevX = this.startPoints[1].x;
  //   // let prevY = this.startPoints[1].y;
  //   // for (const point of this.points) {
  //   //   point.update();
  //   //   const cx = (prevX + point.x) / 2;
  //   //   const cy = (prevY + point.y) / 2;
  //   //   ctx.quadraticCurveTo(point.x, point.y, cx, cy);
  //   //   prevX = point.x;
  //   //   prevY = point.y;
  //   // }
  //   // const cx = (prevX + this.endPoints[0].x) / 2;
  //   // const cy = (prevY + this.endPoints[0].y) / 2;
  //   // ctx.quadraticCurveTo(prevX, prevY, cx, cy);
  //   // ctx.lineTo(this.endPoints[0].x, this.endPoints[0].y);
  //   // ctx.lineTo(prevX, prevY);

  //   // let prevX = this.points[0].x;
  //   // let prevY = this.points[0].y;

  //   // // let test = false;
  //   // let test = true;

  //   // if (test == false) ctx.moveTo(prevX, prevY);
  //   // if (test) ctx.arc(prevX, prevY, 10, 0, 2 * Math.PI);
  //   // for (let i = 1; i < this.totalPoints; ++i) {
  //   //   if (i < this.totalPoints - 1) {
  //   //     this.points[i].update();
  //   //   }
  //   //   const cx = (prevX + this.points[i].x) / 2;
  //   //   const cy = (prevY + this.points[i].y) / 2;
  //   //   if (test == false) ctx.quadraticCurveTo(prevX, prevY, cx, cy);
  //   //   prevX = this.points[i].x;
  //   //   prevY = this.points[i].y;
  //   //   if (test) ctx.arc(prevX, prevY, 10, 0, 2 * Math.PI);
  //   // }
  //   // if (test == false) ctx.lineTo(prevX, prevY);

  //   ctx.stroke();
  //   ctx.closePath();
  // }
}
