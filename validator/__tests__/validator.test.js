'use strict';

const validatorModule = require('../lib/validator.js');
const faker = require('faker');
const validatorClass = require('../lib/validatorClass.js')


let types = ['Module', 'Class'];

function getValidator(type) {
  switch (type) {
    case 'Module':
      return validatorModule;
    case 'Class':
      return validatorClass;
    default:
      return {};
  }
}



const schema = {

  fields: {
    id: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    age: {
      type: 'number',
      required: true
    },
    children: {
      type: 'array',
      valueType: 'string'
    },
  },
};

let str = 'yes';
let num = 1;
let arr = ['a'];
let obj = {
  x: 'y'
};
let func = () => {};
let bool = false;

describe('validator module performs basic validation of', () => {
  types.forEach(type => {
    const validator = getValidator(type);

    it('strings', () => {
      expect(validator.isString(str)).toBeTruthy();
      expect(validator.isString(num)).toBeFalsy();
      expect(validator.isString(arr)).toBeFalsy();
      expect(validator.isString(obj)).toBeFalsy();
      expect(validator.isString(func)).toBeFalsy();
      expect(validator.isString(bool)).toBeFalsy();
    });

    it('numbers', () => {
      expect(validator.isNumber(str)).toBeFalsy();
      expect(validator.isNumber(num)).toBeTruthy();
      expect(validator.isNumber(arr)).toBeFalsy();
      expect(validator.isNumber(obj)).toBeFalsy();
      expect(validator.isNumber(func)).toBeFalsy();
      expect(validator.isNumber(bool)).toBeFalsy();
    });

    it('arrays', () => {
      expect(validator.isArray(str)).toBeFalsy();
      expect(validator.isArray(num)).toBeFalsy();
      expect(validator.isArray(arr)).toBeTruthy();
      expect(validator.isArray(obj)).toBeFalsy();
      expect(validator.isArray(func)).toBeFalsy();
      expect(validator.isArray(bool)).toBeFalsy();
    });

    it('objects', () => {
      expect(validator.isObject(str)).toBeFalsy();
      expect(validator.isObject(num)).toBeFalsy();
      expect(validator.isObject(arr)).toBeFalsy();
      expect(validator.isObject(obj)).toBeTruthy();
      expect(validator.isObject(func)).toBeFalsy();
      expect(validator.isObject(bool)).toBeFalsy();
    });

    it('booleans', () => {
      expect(validator.isBoolean(str)).toBeFalsy();
      expect(validator.isBoolean(num)).toBeFalsy();
      expect(validator.isBoolean(arr)).toBeFalsy();
      expect(validator.isBoolean(obj)).toBeFalsy();
      expect(validator.isBoolean(func)).toBeFalsy();
      expect(validator.isBoolean(bool)).toBeTruthy();
    });

    it('functions', () => {
      expect(validator.isFunction(str)).toBeFalsy();
      expect(validator.isFunction(num)).toBeFalsy();
      expect(validator.isFunction(arr)).toBeFalsy();
      expect(validator.isFunction(obj)).toBeFalsy();
      expect(validator.isFunction(func)).toBeTruthy();
      expect(validator.isFunction(bool)).toBeFalsy();
    });
  });

});



describe('validates the basic schema', () => {
  types.forEach(type => {
    const validator = getValidator(type);
    it('isValid() function validates a good record.', () => {
      //go through the schema, and fill in perfect values for every field.
      let testRecord = {};

      for (let field in schema.fields) {
        switch (schema.fields[field].type) {
          case 'boolean':
            testRecord[field] = faker.random.boolean();
            break;
          case 'number':
            testRecord[field] = faker.random.number();
            break;
          case 'string':
            testRecord[field] = faker.random.word();
            break;
          case 'array':
            testRecord[field] = [];
            testRecord[field].push(faker.random.arrayElement());
            testRecord[field].push(faker.random.arrayElement());
            break;
          default:
            null;
        }
      }
      expect(validator.isValid(schema, testRecord)).toBeTruthy();
    });

    it('isValid() function returns undefined with missing requirements', () => {
      //go through the schema and fill in perfect values for every field
      let testRecord = {};
      for (let field in schema.fields) {
        if (schema.fields[field].required) {
          testRecord[field] = null;
        }
      }
      expect(validator.isValid(schema, testRecord)).toBeFalsy();
    });
  });

});

const personRules = {
  fields: {
    id: {
      type: 'string',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    age: {
      type: 'number',
      required: true,
    },
    children: {
      type: 'array',
      valueType: 'string',
    },
  },
};

const susan = {
  id: '123-45-6789',
  name: 'Susan McDeveloperson',
  age: 37,
  children: [],
};

const fred = {
  id: 38,
  name: 'Freddy McCoder',
  children: [],
};

const ned = {

};

const arrayRules = {
  fields: {
    test: {
      type: 'array',
      valueType: 'number',
    }
  }
};

const richard = {
  test: ['dick', 34]
}

describe('validator module performs complex validations', () => {
  types.forEach(type => {
    const validator = getValidator(type);
    it('Validates an object with a set of rules against an object', () => {

      expect(validator.isValid(personRules, susan)).toBeTruthy();
    });


    it('validates an object with a set of rules against an object that does not pass', () => {

      expect(validator.isValid(personRules, fred)).toBeFalsy();
    });

    it('does not validate rules against an empty object', () => {

      expect(validator.isValid(personRules, ned)).toBeFalsy();
    });

    it('validates a value array against an approved list', () => {

      expect(validator.isValid(arrayRules, richard)).toBeFalsy();
    });
  });

  // TODO: Cover so, so many more cases

});