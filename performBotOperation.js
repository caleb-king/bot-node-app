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
    
    //PROBLEM -> There is a jitter in the servo when you leave it powered. 
    //GENERAL SOLUTION -> When you turn the servo off, it still holds its position.
    //OPTION 1 -> Start an interval and then trigger the 'servoWrite(0)'.
    setTimeout(() => motors.tiltServo.servoWrite(0), 30);
    //OPTION 2 -> Immediately turn off the servo.
    //motors.tiltServo.servoWrite(0);

    //Another possible solution might be to modify the pwmFrequency(frequency) - see https://github.com/fivdi/pigpio/blob/master/doc/gpio.md#pwmfrequencyfrequency
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
    
    //PROBLEM -> There is a jitter in the servo when you leave it powered. 
    //GENERAL SOLUTION -> When you turn the servo off, it still holds its position.
    //OPTION 1 -> Start an interval and then trigger the 'servoWrite(0)'.
    setTimeout(() => motors.tiltServo.servoWrite(0), 30);
    //OPTION 2 -> Immediately turn off the servo.
    //motors.tiltServo.servoWrite(0);
    break;
  }

  previousCommand = command;
};

module.exports = {
  turnOffMotors,
  performBotOperation,
};