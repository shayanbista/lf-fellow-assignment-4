export class ball {
  constructor(x, y, radius, color, width, height) {
    this.x = x;
    this.y = y;

    this.velocity = {
      x: Math.random() * 4 - 1,
      y: Math.random() * 4 - 1,
    };

    this.containerWidth = width;
    this.containerHeight = height;
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.element = this.createBall();
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
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;

    if (this.x + this.radius * 2 >= this.containerWidth || this.x <= 0) {
      this.velocity.x *= -1;
    }

    if (this.y + this.radius * 2 >= this.containerHeight || this.y <= 0) {
      this.velocity.y *= -1;
    }
  };

  isColliding = (nextBall) => {
    let x1 = this.x;
    let y1 = this.y;
    let x2 = nextBall.x;
    let y2 = nextBall.y;

    //calculating the distance
    let l1 = Math.pow(x2 - x1, 2);
    let l2 = Math.pow(y2 - y1, 2);
    let l3 = l1 + l2;

    let distance = Math.sqrt(l3);

    let totalRadius = Math.ceil(this.radius) + Math.ceil(nextBall.radius);

    if (distance <= totalRadius) {
      return true;
    }

    return false;
  };

  updatecolor = (newColor) => {
    this.color = newColor;
    this.element.style.backgroundColor = newColor;
  };
}
