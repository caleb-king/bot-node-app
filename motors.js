const Gpio = require('pigpio').Gpio;

const pinNums = {
  rightWheelForward: 22,
  rightWheelBackward: 23,
  leftWheelForward: 18,
  leftWheelBackward: 17,
  tiltServo:24,
  panServo: 31
};


//DC Motors

const rightWheelForward = new Gpio(pinNums.rightWheelForward, {mode: Gpio.OUTPUT});
const rightWheelBackward = new Gpio(pinNums.rightWheelBackward, {mode: Gpio.OUTPUT});
const leftWheelForward = new Gpio(pinNums.leftWheelForward, {mode: Gpio.OUTPUT});
const leftWheelBackward = new Gpio(pinNums.leftWheelBackward, {mode: Gpio.OUTPUT});

//dutycycle: 0-range (range defaults to 255)
const dutyCycleOff = 0;
const dutyCycleOn = 200;
const spinningDutyCycle = 125;


//Servo Motors

const tiltServo = new Gpio(pinNums.tiltServo, {mode: Gpio.OUTPUT});
const panServo = new Gpio(pinNums.panServo, {mode: Gpio.OUTPUT});

//pulsewidth: 0 (off), 500 (anti-clockwise) - 2500 (clockwise).
let tiltServoPW = 1500;
let panServoPW = 1500;

const servoIncrement = 20;


module.exports = {
  rightWheelForward,
  rightWheelBackward,
  leftWheelForward,
  leftWheelBackward,
  dutyCycleOff,
  dutyCycleOn,
  tiltServo,
  panServo,
  tiltServoPW,
  panServoPW,
  servoIncrement,
  spinningDutyCycle
};