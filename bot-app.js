const url = 'https://secret-shelf-46048.herokuapp.com/';
const fetch = require('node-fetch');
const motors = require('./motors');
const { performBotOperation, turnOffMotors } = require('./performBotOperation');


const initializeMotors = function() {
  turnOffMotors();
  console.log('initialize tilt to ', motors.tiltServoPW);
  motors.tiltServo.servoWrite(motors.tiltServoPW);
  console.log('initialize pan to ', motors.panServoPW);
  motors.panServo.servoWrite(motors.panServoPW);
};

let getCommand = function() {
  fetch(url)
    .then(res => res.text())
    .then(body => performBotOperation(body))
    .catch(err => console.log(err));
};

const main = function() {
  initializeMotors();
  setInterval(() => getCommand(), 50);
};

main();