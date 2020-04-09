const motors = require('./motors');

const turnOffMotors = function() {
  console.log('all motors turned off');
  motors.rightWheelForward.pwmWrite(motors.dutyCycleOff);
  motors.rightWheelBackward.pwmWrite(motors.dutyCycleOff);
  motors.leftWheelForward.pwmWrite(motors.dutyCycleOff);
  motors.leftWheelBackward.pwmWrite(motors.dutyCycleOff);
};

let previousCommand = 'none';

const performBotOperation = function (command) {
  
  if(command === 'none') {
    if (previousCommand === 'none') return;
    turnOffMotors();
    previousCommand = command;
    return;
  }

  switch(command) {
      
  case 'spin left':
    if(command === previousCommand) return;
    console.log('Spinning to the left!');
    motors.leftWheelBackward.pwmWrite(motors.spinningDutyCycle);
    motors.rightWheelForward.pwmWrite(motors.spinningDutyCycle);
    break;
    
  case 'move forward':
    if(command === previousCommand) return;
    console.log('Moving forwards!');
    motors.leftWheelForward.pwmWrite(motors.dutyCycleOn);
    motors.rightWheelForward.pwmWrite(motors.dutyCycleOn);
    break;

  case 'spin right':
    if(command === previousCommand) return;
    console.log('Spinning to the right!');
    motors.leftWheelForward.pwmWrite(motors.spinningDutyCycle);
    motors.rightWheelBackward.pwmWrite(motors.spinningDutyCycle);
    break;

  case 'move backward':
    if(command === previousCommand) return;
    console.log('Moving backwards!');
    motors.leftWheelBackward.pwmWrite(motors.dutyCycleOn);
    motors.rightWheelBackward.pwmWrite(motors.dutyCycleOn);
    break;

  case 'left':
    if((motors.panServoPW - motors.servoIncrement) < 1000) break;
    motors.panServoPW -= motors.servoIncrement;
    motors.panServo.servoWrite(motors.panServoPW);
    console.log('panServo now set to ', motors.panServoPW);
    break;

  case 'up':
    if((motors.tiltServoPW + motors.servoIncrement) > 2000) break;
    motors.tiltServoPW += motors.servoIncrement;
    motors.tiltServo.servoWrite(motors.tiltServoPW);
    console.log('tiltServo now set to ', motors.tiltServoPW);
    break;

  case 'right':
    if((motors.panServoPW + motors.servoIncrement) > 2000) break;
    motors.panServoPW += motors.servoIncrement;
    motors.panServo.servoWrite(motors.panServoPW);
    console.log('panServo now set to ', motors.panServoPW);
    break;

  case 'down':
    if((motors.tiltServoPW - motors.servoIncrement) < 1000) break;
    motors.tiltServoPW -= motors.servoIncrement;
    motors.tiltServo.servoWrite(motors.tiltServoPW);
    console.log('tiltServo now set to ', motors.tiltServoPW);
    break;
  }

  previousCommand = command;
};

module.exports = {
  turnOffMotors,
  performBotOperation,
};