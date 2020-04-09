const fetch = require('node-fetch');
const motors = require('./motors');
const { performBotOperation, turnOffMotors } = require('./performBotOperation');


const initializeMotors = function() {
  turnOffMotors();
  console.log('initialize tilt to ', motors.tiltServoPW);
  //motors.tiltServo.servoWrite(motors.tiltServoPW);
  console.log('initialize pan to ', motors.panServoPW);
  //motors.panServo.servoWrite(motors.panServoPW);
};

let getCommand = function() {
  fetch('http://localhost:8000/')
    .then(res => res.text())
    .then(body => performBotOperation(body));
};

const main = function() {
  initializeMotors();
  setInterval(() => getCommand(), 50);
};

main();