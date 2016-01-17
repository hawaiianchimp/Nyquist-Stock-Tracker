import { moduleFor, test } from 'ember-qunit';

let service;

moduleFor('service:math-service', 'Unit | Service | math service', {
  // Specify the other units that are required for this test.
  needs: ['service:inputService'],
	beforeEach() {
		service = this.subject();
	}
});

test('Simple Moving Average', function(assert) {
	assert.expect(13);
	assert.equal(service.sma(0, [1,10,1]), 0, 'testing zero days selected');
	assert.equal(service.sma(3, []), 0, 'testing empty array');
	assert.equal(service.sma(3, [1,1,1]), 1, 'testing days equal to array.length');
	assert.equal(service.sma(2, [1,1,1]), 1, 'testing days less than array.length');
	assert.equal(service.sma(4, [1,1,1]), 1, 'testing days greating than array.length');
	assert.equal(service.sma(3, [2,5,2]), 3, 'testing different numbers');
	assert.equal(service.sma(3, [2,4,7,4]), 5, 'testing larger arrays');
	assert.equal(service.sma(5, [2,4,728,4,10,2,6]), 150, 'testing larger inputs');
	assert.equal(service.sma(200, [1,2,3,4,5]), 3, 'testing large days selection');
  assert.equal(service.sma(10.9, [1,2,3,4,5]), 3, 'Function does not break on decimal limit');
	assert.equal(service.sma(200, [1,2,3,4,6,2,63,5]), 10.75, 'testing decimal output');
	assert.equal(service.sma(200, [1.45,2.25,3.12,4.76,6.2,2.3,63.9,5.6]), 11.1975, 'testing decimal input');
	assert.equal(service.sma(3, [4,5,2]), (4+5+2)/(3), 'testing rounding of repeating decimal output');
});

test('Exponential Moving Average', function(assert) {
	assert.expect(17);
	assert.equal(service.ema(0, [1,10,1]), 0, 'testing zero days selected');
	assert.equal(service.ema(3, []), 0, 'testing empty array');
	assert.equal(service.ema(3, [1,1,1]), 1, 'testing days equal to array.length');
	assert.equal(service.ema(2, [1,1,1]), 1, 'testing days less than array.length');
	assert.equal(service.ema(4, [1,1,1]), 1, 'testing days greating than array.length');
	assert.equal(service.ema(3, [2,5,2]), 3, 'testing different numbers');
	assert.equal(service.ema(3, [2,4,7,4]), 5, 'testing larger arrays');
	assert.equal(service.ema(5, [2,4,728,4,10,2,6]), 53.6, 'testing larger inputs');
  assert.equal(service.ema(10, [1,2,3,4,5,6,7,8,9,10]), 7.01, 'testing larger inputs');
  assert.equal(service.ema(10, [10,9,8,7,6,5,4,3,2,1]), 3.99, 'testing larger inputs');
	assert.equal(service.ema(5, [2,4,6,4,10,3,728]), 246.4, 'testing larger inputs');
	assert.equal(service.ema(200, [1,2,3,4,5]), 3.67, 'testing large days selection');
	assert.equal(service.ema(200, [1,2,3,4,6,2,63,5]), 15.36, 'testing decimal output');
	assert.equal(service.ema(200, [1.45,2.25,3.12,4.76,6.2,2.3,63.9,5.6]), 15.86, 'testing decimal input');
	assert.equal(service.ema(3, [4,5,2]), 3.34, 'testing rounding of repeating decimal output');
  assert.equal(service.ema(10, [22.27,22.19,22.08,22.17,22.18,22.13,22.23,22.43,22.24,22.29]), 22.25, 'testing rounding of repeating decimal output');
  assert.equal(service.ema(10, [
    22.27,
    22.19,
    22.08,
    22.17,
    22.18,
    22.13,
    22.23,
    22.43,
    22.24,
    22.29,
    22.15,
    22.39,
    22.38,
    22.61,
    23.36,
    24.05,
    23.75,
    23.83,
    23.95,
    23.63,
    23.82,
    23.87,
    23.65,
    23.19,
    23.10,
    23.33,
    23.68,
    23.10,
    22.40,
    22.17
    ]),
    23, 'testing rounding of repeating decimal output');
});
