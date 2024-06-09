import { ball } from "./ball.js";
import { resolveCollision } from "./collision.js";

const width = 1200;
const height = 700;

const ballField = document.getElementById("rectangle");

ballField.style.width = `${width}px`;
ballField.style.height = `${height}px`;
ballField.style.backgroundColor = "black";
ballField.style.position = "relative";
ballField.style.border = "1px solid black";

// default colors
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "lightpink",
  "lightcoral",
  "lightgoldenrodyellow",
  "lightyellow",
  "lightcyan",
  "lightblue",
  "lightskyblue",
  "lightsteelblue",
  "lightgreen",
  "lightseagreen",
];

// new color of the ball after colliding
export const collidedColors = [
  "red",
  "blue",
  "navy",
  "skyblue",
  "blue",
  "green",
  "gold",
  "yellow",
  "orange",
  "blanchedalmond",
  "gray",
  "white",
  "purple",
  "rosybrown",
  "moccasin",
  "rosybrown",
  "sandybrown",
  "seashell",
  "springgreen",
  "thistle",
];

const balls = [];

let randomNumber = Math.floor(Math.random() * 50);
let totalBalls = Number(150 + randomNumber);

for (let i = 0; i < totalBalls; i++) {
  // const radius = 10; (use this radius for stress test)
  const radius = 5 + Math.random() * 10;
  const x = Math.random() * (ballField.clientWidth - radius * 2);
  const y = Math.random() * (ballField.clientHeight - radius * 2);

  const randomIndex = Math.floor(Math.random() * 12);
  const color = colors[randomIndex];
  balls.push(
    new ball(x, y, radius, color, ballField.clientWidth, ballField.clientHeight)
  );
}

// This adds new ball to the field
balls.forEach((ballElement) => {
  ballField.appendChild(ballElement.element);
});

// THis part updates the balls to move and checks for collision
const updateBall = () => {
  balls.forEach((element, index) => {
    element.moveBall();

    for (let adjacentBall = 0; adjacentBall < balls.length; adjacentBall++) {
      if (
        index != adjacentBall &&
        balls[index].isColliding(balls[adjacentBall])
      ) {
        resolveCollision(balls[index], balls[adjacentBall]);
        const collidingBall = balls[adjacentBall];
        const currentBall = balls[index];
        collidingBall.element.style.backgroundColor = collidingBall.color;
        currentBall.element.style.backgroundColor = currentBall.color;
      }
    }
  });

  window.requestAnimationFrame(updateBall);
};

// this refreshes the frames
window.requestAnimationFrame(updateBall);
