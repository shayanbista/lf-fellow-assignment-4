export class ball {
  constructor(x, y, radius, color, width, height) {
    this.x = x;
    this.y = y;
    this.velocityX = 2;
    this.velocityY = 2;
    this.containerWidth = width;
    this.containerHeight = height;
    this.radius = radius;
    this.color = color;
    this.element = this.createBall();
    console.log(width);
  }

  createBall() {
    this.ball = document.createElement("div");
    this.ball.style.position = "absolute";
    this.ball.style.left = `${this.x}px`;
    this.ball.style.top = `${this.y}px`;
    this.ball.style.background = `${this.color}`;
    this.ball.style.width = `${this.radius * 2}px`;
    this.ball.style.height = `${this.radius * 2}px`;
    this.ball.style.borderRadius = "50%";
    this.ball.style.backgroundColor = `${this.color}`;
    return this.ball;
  }

  moveBall = () => {
    this.x += this.velocityX;
    this.y += this.velocityY;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    if (this.x + this.radius * 2 >= this.containerWidth || this.x <= 0) {
      this.velocityX *= -1;
    }

    if (this.y + this.radius * 2 >= this.containerHeight || this.y <= 0) {
      this.velocityY *= -1;
    }
  };

  isColliding = (nextBall) => {
    let x1 = this.x;
    let y1 = this.y;
    let x2 = nextBall.x;
    let y2 = nextBall.y;

    let part1 = Math.pow(x2 - x1, 2);
    let part2 = Math.pow(y2 - y1, 2);

    let part3 = part1 + part2;
    let distance = Math.sqrt(part3);
    console.log("distance", distance);

    let totalRadius = this.radius + nextBall.radius;
    console.log("radius", totalRadius);

    if (distance <= totalRadius) {
      console.log("its colliding");
      this.velocityX = this.velocityX * -1;
      this.velocityY = this.velocityY * -1;
    }

  };
}
