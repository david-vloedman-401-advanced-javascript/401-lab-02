'use strict';
/**
 * Vehicle
 * @class
 */
class Vehicle {
  constructor(name, wheels) {
    this.name = name;
    this.wheels = wheels;
  }
  /**
 * Drive the vehicle
 * @returns {string}
 */
  drive() {
    return 'Moving Forward';
  }
  /**
 * Stop the vehicle
 * @returns {string}
 */
  stop() {
    return 'Stopping';
  }

}
/**
 * Car 
 * @class
 */
class Car extends Vehicle {
  constructor(name) {
    super(name, 4);
  }
}
/**
 * Motorcycle 
 * @class
 */
class Motorcycle extends Vehicle {
  constructor(name) {
    super(name, 2);
  }
  /**
 * Do a wheelie!
 * @returns {string}
 */
  wheelie() {
    return 'Wheee!';
  }
}

module.exports = {
  Car,
  Motorcycle,
};