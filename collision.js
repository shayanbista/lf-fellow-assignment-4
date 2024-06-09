import { ball } from "./ball.js";

import { collidedColors } from "./main.js";

let rotatedX, rotatedY, rotatedVelocity;

// angle between two balls
function getAngleofCollision(current, colliding) {
  let angle = -Math.atan2(current.y - colliding.y, current.x - colliding.x);
  return angle;
}

// rotate the vector to allign
function rotateVector(velocity, angle) {
  rotatedX = velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle);
  rotatedY = velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle);
  return (rotatedVelocity = {
    x: rotatedX,
    y: rotatedY,
  });
}

// resolve collision.
export function resolveCollision(current, collidingBall) {
  const xVelocityDiff = current.velocity.x - collidingBall.velocity.x;
  const yVelocityDiff = current.velocity.y - collidingBall.velocity.y;

  const xDist = collidingBall.x - current.x;
  const yDist = collidingBall.y - current.y;

  // prevent  accidental overlap of balls
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // calculate the angle of collision
    let angle = getAngleofCollision(current, collidingBall);
    // rotate the initial vectors.
    let u1 = rotateVector(current.velocity, angle);
    let u2 = rotateVector(collidingBall.velocity, angle);

    // get the mass of ball
    let m1 = current.mass;
    let m2 = collidingBall.mass;

    // applying one-dimensional elastic collisions.
    let rotated_v1 = {
      x: ((m1 - m2) / (m1 + m2)) * u1.x + ((2 * m2) / (m1 + m2)) * u2.x,
      y: u1.y,
    };
    let rotated_v2 = {
      x: ((2 * m1) / (m1 + m2)) * u1.x + ((m2 - m1) / (m1 + m2)) * u2.x,
      y: u2.y,
    };

    // rotate the vectors back to original axis.
    let v1 = rotateVector(rotated_v1, -angle);
    let v2 = rotateVector(rotated_v2, -angle);

    // update the velocities
    current.velocity.x = v1.x;
    current.velocity.y = v1.y;

    collidingBall.velocity.x = v2.x;
    collidingBall.velocity.y = v2.y;

    // change the color of colliding ball
    let randomcolorIndex = Math.floor(Math.random() * 30);
    collidingBall.color = collidedColors[randomcolorIndex];
  }
}
