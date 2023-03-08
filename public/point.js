export class Point {
  constructor(degree, x, y, height = 200, speed = 0.01) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = speed;
    this.degree = degree;
    this.height = height;
  }

  update() {
    this.degree += this.speed;
    this.y = this.fixedY + Math.sin(this.degree) * this.height;
  }
}
