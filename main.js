import { ball } from "./ball.js";
import { resolveCollision } from "./collision.js";

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

const balls = [];

for (let i = 0; i < 50; i++) {
  const radius = 10 + Math.floor(Math.random() * 5);
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
        console.log("collide function is called");
        resolveCollision(balls[index], balls[adjacentBall]);

        element.moveBall();

        const collidingBall = balls[adjacentBall];
        collidingBall.element.style.backgroundColor = collidingBall.color;
      }
    }
  });

  window.requestAnimationFrame(updateBall);
};

window.requestAnimationFrame(updateBall);
