import { ball } from "./ball.js";
const width = 700;
const height = 700;

const ballField = document.getElementById("rectangle");
console.log(ballField);

ballField.style.width = `${width}px`;
ballField.style.height = `${height}px`;
ballField.style.position = "relative";
ballField.style.border = "1px solid black";

const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "violet",
  "yellow",
  "cyan",
  "magenta",
  "teal",
  "maroon",
  "navy",
  "olive",
  "lime",
  "silver",
  "aqua",
  "fuchsia",
  "gray",
  "black",
  "white",
];

const balls = [];

for (let i = 0; i < 10; i++) {
  const radius = 10 + Math.random() * 20;
  const x = Math.random() * (ballField.clientWidth - radius * 2);
  const y = Math.random() * (ballField.clientHeight - radius * 2);

  const randomIndex = Math.floor(Math.random() * 20);
  const color = colors[randomIndex];
  balls.push(
    new ball(x, y, radius, color, ballField.clientHeight, ballField.clientWidth)
  );
}

balls.forEach((ballElement) => {
  // appending the ball
  ballField.appendChild(ballElement.element);
});

// moving the ball
const updateBall = () => {
  balls.forEach((element, index) => {
    element.moveBall();

    for (let adjacentBall = 0; adjacentBall < balls.length; adjacentBall++) {
      if (
        index != adjacentBall &&
        balls[index].isColliding(balls[adjacentBall])
      ) {
        console.log("collision has occured", index);
      }
    }
  });

  window.requestAnimationFrame(updateBall);
};

window.requestAnimationFrame(updateBall);
