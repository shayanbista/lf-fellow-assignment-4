import { ball } from "./ball.js";
import { collision } from "./collision.js";

const width = 1200;
const height = 600;

const ballField = document.getElementById("rectangle");
console.log(ballField);

ballField.style.width = `${width}px`;
ballField.style.height = `${height}px`;
ballField.style.backgroundColor = "black";
ballField.style.position = "relative";
ballField.style.border = "1px solid black";

let randomIndex = Math.floor(Math.random() * 20);

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

// colors after collison
export const collidedColors = [
  "Red",
  "Blue",
  "Yellow",
  "Green",
  "Orange",
  "Pink",
  "Cyan",
  "Purple",
  "Magenta",
  "Turquoise",
  "Lime",
  "Teal",
  "Violet",
  "Amber",
  "Indigo",
  "Lavender",
  "Maroon",
  "Gold",
  "Sky Blue",
  "Coral",
  "Olive",
  "Ruby",
  "Aqua",
  "Sapphire",
  "Fuchsia",
  "Lemon",
  "Azure",
  "Rose",
  "Tangerine",
  "Jade",
  "lightgray",
  "lightgrey",
  "lightgoldenrod",
  "lightpink2",
  "lightseashell",
  "lightlavender",
  "lightmintcream",
  "lightaliceblue",
  "lightbeige",
  "lightkhaki",
];

function addBall() {
  const radius = 7 + Math.random() * 5;
  const x = Math.random() * (ballField.clientWidth - radius * 2);
  const y = Math.random() * (ballField.clientHeight - radius * 2);
  const randomIndex = Math.floor(Math.random() * 20);
  const color = colors[randomIndex];
  const newBall = new ball(
    x,
    y,
    radius,
    color,
    ballField.clientWidth,
    ballField.clientHeight
  );
  ballField.appendChild(newBall.element);
}

const balls = [];

for (let i = 0; i < 1; i++) {
  const radius = 7 + Math.random() * 5;
  const x = Math.random() * (ballField.clientWidth - radius * 2);
  const y = Math.random() * (ballField.clientHeight - radius * 2);

  const randomIndex = Math.floor(Math.random() * 20);
  const color = colors[randomIndex];
  balls.push(
    new ball(x, y, radius, color, ballField.clientWidth, ballField.clientHeight)
  );
}

// appending the ball
balls.forEach((ballElement) => {
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
        collision(balls[index], balls[adjacentBall]);
        const collidingBall = balls[adjacentBall];
        collidingBall.element.style.backgroundColor = collidingBall.color;
      }
    }
  });

  window.requestAnimationFrame(updateBall);
};
window.addEventListener("keypress", (event) => {
  if (event.key == "a") {
    console.log("a is pressed");
    const ball = addBall();
    balls.push(ball);
  }
});
window.requestAnimationFrame(updateBall);
