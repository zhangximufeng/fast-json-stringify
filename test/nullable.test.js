'use strict'

const test = require('tap').test

const build = require('..')

const nullable = true

const complexObject = {
  type: 'object',
  properties: {
    nullableString: { type: 'string', nullable },
    nullableNumber: { type: 'number', nullable },
    nullableInteger: { type: 'integer', nullable },
    nullableBoolean: { type: 'boolean', nullable },
    nullableNull: { type: 'null', nullable },
    nullableArray: {
      type: 'array',
      nullable: true,
      items: {}
    },
    nullableObject: { type: 'object', nullable: true },
    objectWithNullableProps: {
      type: 'object',
      nullable: false,
      additionalProperties: true,
      properties: {
        nullableString: { type: 'string', nullable },
        nullableNumber: { type: 'number', nullable },
        nullableInteger: { type: 'integer', nullable },
        nullableBoolean: { type: 'boolean', nullable },
        nullableNull: { type: 'null', nullable },
        nullableArray: {
          type: 'array',
          nullable: true,
          items: {}
        }
      }
    },
    arrayWithNullableItems: {
      type: 'array',
      nullable: true,
      items: { type: ['integer', 'string'], nullable: true }
    }
  }
}

const complexData = {
  nullableString: null,
  nullableNumber: null,
  nullableInteger: null,
  nullableBoolean: null,
  nullableNull: null,
  nullableArray: null,
  nullableObject: null,
  objectWithNullableProps: {
    additionalProp: null,
    nullableString: null,
    nullableNumber: null,
    nullableInteger: null,
    nullableBoolean: null,
    nullableNull: null,
    nullableArray: null
  },
  arrayWithNullableItems: [1, 2, null]
}

const complexExpectedResult = {
  nullableString: null,
  nullableNumber: null,
  nullableInteger: null,
  nullableBoolean: null,
  nullableNull: null,
  nullableArray: null,
  nullableObject: null,
  objectWithNullableProps: {
    additionalProp: null,
    nullableString: null,
    nullableNumber: null,
    nullableInteger: null,
    nullableBoolean: null,
    nullableNull: null,
    nullableArray: null
  },
  arrayWithNullableItems: [1, 2, null]
}

const testSet = {
  nullableString: [{ type: 'string', nullable }, null, null],
  nullableNumber: [{ type: 'number', nullable }, null, null],
  nullableInteger: [{ type: 'integer', nullable }, null, null],
  nullableBoolean: [{ type: 'boolean', nullable }, null, null],
  nullableNull: [{ type: 'null', nullable }, null, null],
  nullableArray: [{
    type: 'array',
    nullable: true,
    items: {}
  }, null, null],
  nullableObject: [{ type: 'object', nullable: true }, null, null],
  complexObject: [complexObject, complexData, complexExpectedResult, { ajv: { allowUnionTypes: true } }]
}

Object.keys(testSet).forEach(key => {
  test(`handle nullable:true in ${key} correctly`, (t) => {
    t.plan(1)

    const [
      schema,
      data,
      expected,
      extraOptions
    ] = testSet[key]

    const stringifier = build(schema, extraOptions)
    const result = stringifier(data)
    t.same(JSON.parse(result), expected)
  })
})
