'use strict';

class Validator {
  constructor() {

  }
  /**
   * Is this valid
   *  type?
   * @param schema
   * @param input
   * @returns {boolean}
   */
  isValid(schema, input) {
    let valid = true;
    for (let fieldName in schema.fields) {
      let field = schema.fields[fieldName];
      let required = field.required ?
        this.isTruthy(input[fieldName]) :
        true;

      let type = field.type ?
        this.isCorrectType(input[fieldName], field) :
        true;

      if (!(required && type)) {
        valid = false;
      }
    }
    return valid;
  }
  /**
   * Is this the correct type?
   * @param input
   * @param valueType
   * @returns {boolean}
   */
  isCorrectType(input, field) {
    switch (field.type) {
    case 'string':
      return this.isString(input);
    case 'number':
      return this.isNumber(input);
    case 'array':
      return this.isArray(input, field.valueType);
    case 'object':
      return this.isObject(input);
    case 'boolean':
      return this.isBoolean(input);
    default:
      return false;
    }
  }
  /**
   * Is this a string?
   * @param input
   * @returns {boolean}
   */
  isString(input) {
    return typeof input === 'string';
  }
  /**
   * Is this an object?
   * @param input
   * @returns {boolean}
   */
  isObject(input) {
    return typeof input === 'object' && !(input instanceof Array);
  }
  /**
   * Is this an array?
   * @param input
   * @returns {boolean}
   */
  isArray(input, valueType) {
    return Array.isArray(input) && (valueType ? input.every(val => typeof val === valueType) : true);
  }
  /**
   * Is this a boolean?
   * @param input
   * @returns {boolean}
   */
  isBoolean(input) {
    return typeof input === 'boolean';
  }
  /**
   * Is this a number?
   * @param input
   * @returns {boolean}
   */
  isNumber(input) {
    return typeof input === 'number';
  }
  /**
   * Is this a function?
   * @param input
   * @returns {boolean}
   */
  isFunction(input) {
    return typeof input === 'function';
  }
  /**
   * Is this a truthy?
   * @param input
   * @returns {boolean}
   */
  isTruthy(input) {
    return !!input;
  }
}

module.exports = new Validator();