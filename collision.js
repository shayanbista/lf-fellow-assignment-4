import { ball } from "./ball.js";

import { collidedColors } from "./main.js";

function calculateAngle(currentBall, collidingBall) {
  let angle = Math.atan2(
    collidingBall.y - currentBall.y,
    collidingBall.x - currentBall.x
  );
  return angle;
}

function rotateVector(velocity, angle) {
  let rotatedVelocity;
  let xRotate = velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle);
  let yRotate = velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle);
  return (rotatedVelocity = {
    x: xRotate,
    y: yRotate,
  });
}

// resolve collision.
export function collision(currentBall, collidingBall) {
  const xVelocityDiff = currentBall.velocity.x - collidingBall.velocity.x;
  const yVelocityDiff = currentBall.velocity.y - collidingBall.velocity.y;

  const xDist = collidingBall.x - currentBall.x;
  const yDist = collidingBall.y - currentBall.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // calculate angle of collision
    let angle = calculateAngle(currentBall, collidingBall);

    // rotatevector
    let u1 = rotateVector(currentBall.velocity, angle);
    let u2 = rotateVector(collidingBall.velocity, angle);

    let m1 = currentBall.mass;
    let m2 = collidingBall.mass;

    // applying one-dimensional elastic collisions.
    let newV1 = {
      x: ((m1 - m2) / (m1 + m2)) * u1.x + ((2 * m2) / (m1 + m2)) * u2.x,
      y: u1.y,
    };
    
    let newV2 = {
      x: ((2 * m1) / (m1 + m2)) * u1.x + ((m2 - m1) / (m1 + m2)) * u2.x,
      y: u2.y,
    };

    // again rotate to get to original axis
    let v1 = rotateVector(newV1, -angle);
    let v2 = rotateVector(newV2, -angle);

    //update the current velocities
    currentBall.velocity.x = v1.x;
    currentBall.velocity.y = v1.y;

    collidingBall.velocity.x = v2.x;
    collidingBall.velocity.y = v2.y;

    //change the color of ball after collision
    let randomcolorIndex = Math.floor(Math.random() * 30);
    console.log("color before", collidingBall.color);

    collidingBall.color = collidedColors[randomcolorIndex];

    console.log("color after", collidingBall.color);
  }
}
