const motors = require('./motors');

const turnOffMotors = function() {
  motors.rightWheelForward.pwmWrite(motors.dutyCycleOff);
  motors.rightWheelBackward.pwmWrite(motors.dutyCycleOff);
  motors.leftWheelForward.pwmWrite(motors.dutyCycleOff);
  motors.leftWheelBackward.pwmWrite(motors.dutyCycleOff);
};

const setServoPW = function(command, isPan, servoPW, increment, intervalId) {
  isPan 
    ? motors.panServo.servoWrite(increment) 
    : motors.tiltServo.servoWrite(increment);

  if(increment > 0) {
    if(servoPW < (2500 - increment)) {
      servoPW += increment;
    }
  } else {
    if(servoPW > (500 + increment)) {
      servoPW += increment;
    }
  }
  if (command !== global.command) {
    clearInterval(intervalId);
  }
};

const rotateServo = function(command, isPan, servoPW, increment, interval) {
  let intervalId = setInterval(setServoPW(command, isPan, servoPW, increment, intervalId), interval);
  intervalId();
};

const performBotOperation = function (command) {
  global.command = command;
  if(command === 'none') {
    turnOffMotors();
    return;
  }

  switch(command) {
      
  case 'left':
    console.log('Panning left!');
    rotateServo(command, true, motors.panServo, -motors.servoIncrement, motors.servoInterval);
    break;

  case 'up':
    console.log('Tilting up!');
    rotateServo(command, false, motors.tiltServo, motors.servoIncrement, motors.servoInterval);
    break;

  case 'right':
    console.log('Panning right!');
    rotateServo(command, true, motors.panServo, motors.servoIncrement, motors.servoInterval);
    break;

  case 'down':
    console.log('Tilting down!');
    rotateServo(command, false, motors.tiltServo, -motors.servoIncrement, motors.servoInterval);
    break;

  case 'spin left':
    console.log('Spinning to the left!');
    motors.leftWheelBackward.pwmWrite(motors.dutyCycleOn);
    motors.rightWheelForward.pwmWrite(motors.dutyCycleOn);
    break;
    
  case 'move forward':
    console.log('Moving forwards!');
    motors.leftWheelForward.pwmWrite(motors.dutyCycleOn);
    motors.rightWheelForward.pwmWrite(motors.dutyCycleOn);
    break;

  case 'spin right':
    console.log('Spinning to the right!');
    motors.leftWheelForward.pwmWrite(motors.dutyCycleOn);
    motors.rightWheelBackward.pwmWrite(motors.dutyCycleOn);
    break;

  case 'move backward':
    console.log('Moving backwards!');
    motors.leftWheelBackward.pwmWrite(motors.dutyCycleOn);
    motors.rightWheelBackward.pwmWrite(motors.dutyCycleOn);
    break;
  }
};

module.exports = performBotOperation;