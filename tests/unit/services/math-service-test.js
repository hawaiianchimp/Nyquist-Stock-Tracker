import { moduleFor, test } from 'ember-qunit';

let service;

moduleFor('service:math-service', 'Unit | Service | math service', {
  // Specify the other units that are required for this test.
  needs: ['service:inputService'],
  beforeEach() {
    service = this.subject();
  }
});

test('Simple Moving Average Line', function(assert) {
  assert.expect(15);
  assert.equal(service.smaLine([1,10,1], 0).toString(), [].toString(), 'testing zero days selected');
  assert.equal(service.smaLine([], 3).toString(), [].toString(), 'testing empty array');
  assert.equal(service.smaLine([1,1,1], 3).toString(), [0,0,1].toString(), 'testing days equal to array.length');
  assert.equal(service.smaLine([1,1,1], 2).toString(), [0,1,1].toString(), 'testing days less than array.length');
  assert.equal(service.smaLine([1,1,1], 4).toString(), [0,0,1].toString(), 'testing days greating than array.length');
  assert.equal(service.smaLine([2,5,2], 3).toString(), [0,0,3].toString(), 'testing different numbers');
  assert.equal(service.smaLine([2,5,2]).toString(), [0,0,3].toString(), 'testing optional limit');
  assert.equal(service.smaLine([2,4,7,4], 3).toString(), [0,0,4.33, 5].toString(), 'testing larger arrays');
  assert.equal(service.smaLine([2,4,728,4,10,2,6], 5).toString(), [0,0,0,0,149.6,149.6,150].toString(), 'testing larger inputs');
  assert.equal(service.smaLine([1,2,3,4,5], 200).toString(), [0,0,0,0,3].toString(), 'testing large days selection');
  assert.equal(service.smaLine([1,2,3,4,5], 2).toString(), [0,1.5,2.5,3.5,4.5].toString(), 'testing large days selection');
  assert.equal(service.smaLine([1,2,3,4,5], 10.9).toString(), [0,0,0,0,3].toString(), 'Function does not break on decimal limit');
  assert.equal(service.smaLine([1,2,3,4,6,2,63,5], 3).toString(), [0,0,2,3,4.33,4,23.67,23.33].toString(), 'testing decimal output');
  assert.equal(service.smaLine([1.45,2.25,3.12,4.76,6.2,2.3,63.9,5.6], 5).toString(), [0,0,0,0,3.56,3.73,16.06,16.55].toString(), 'testing decimal input');
  assert.equal(service.smaLine([4,5,2], 3).toString(), [0,0,3.67].toString(), 'testing rounding of repeating decimal output');
});

test('Simple Moving Average', function(assert) {
  assert.expect(14);
  assert.equal(service.sma([1,10,1], 0), 0, 'testing zero days selected');
  assert.equal(service.sma([], 3), 0, 'testing empty array');
  assert.equal(service.sma([1,1,1], 3), 1, 'testing days equal to array.length');
  assert.equal(service.sma([1,1,1], 2), 1, 'testing days less than array.length');
  assert.equal(service.sma([1,1,1], 4), 1, 'testing days greating than array.length');
  assert.equal(service.sma([2,5,2], 3), 3, 'testing different numbers');
  assert.equal(service.sma([2,5,2]), 3, 'testing optional limit');
  assert.equal(service.sma([2,4,7,4], 3), 5, 'testing larger arrays');
  assert.equal(service.sma([2,4,728,4,10,2,6], 5), 150, 'testing larger inputs');
  assert.equal(service.sma([1,2,3,4,5], 200), 3, 'testing large days selection');
  assert.equal(service.sma([1,2,3,4,5], 10.9), 3, 'Function does not break on decimal limit');
  assert.equal(service.sma([1,2,3,4,6,2,63,5], 200), 10.75, 'testing decimal output');
  assert.equal(service.sma([1.45,2.25,3.12,4.76,6.2,2.3,63.9,5.6], 200), 11.1975, 'testing decimal input');
  assert.equal(service.sma([4,5,2], 3), (4 + 5 + 2) / (3), 'testing rounding of repeating decimal output');
});

test('Exponential Moving Average', function(assert) {
  assert.expect(18);
  assert.equal(service.ema([1,10,1], 0), 0, 'testing zero days selected');
  assert.equal(service.ema([], 3), 0, 'testing empty array');
  assert.equal(service.ema([1,1,1], 3), 1, 'testing days equal to array.length');
  assert.equal(service.ema([1,1,1], 2), 1, 'testing days less than array.length');
  assert.equal(service.ema([1,1,1], 4), 1, 'testing days greater than array.length');
  assert.equal(service.ema([2,5,2], 3), 3, 'testing different numbers');
  assert.equal(service.ema([2,5,2]), 3, 'testing optional limit');
  assert.equal(service.ema([2,4,7,4], 3), 5, 'testing larger arrays');
  assert.equal(service.ema([2,4,728,4,10,2,6], 5), 53.6, 'testing larger inputs');
  assert.equal(service.ema([1,2,3,4,5,6,7,8,9,10], 10), 7.01, 'testing larger inputs');
  assert.equal(service.ema([10,9,8,7,6,5,4,3,2,1], 10), 3.99, 'testing larger inputs');
  assert.equal(service.ema([2,4,6,4,10,3,728], 5), 246.4, 'testing larger inputs');
  assert.equal(service.ema([1,2,3,4,5], 200), 3.67, 'testing large days selection');
  assert.equal(service.ema([1,2,3,4,6,2,63,5], 200), 15.36, 'testing decimal output');
  assert.equal(service.ema([1.45,2.25,3.12,4.76,6.2,2.3,63.9,5.6], 200), 15.86, 'testing decimal input');
  assert.equal(service.ema([4,5,2], 3), 3.34, 'testing rounding of repeating decimal output');
  assert.equal(service.ema([22.27,22.19,22.08,22.17,22.18,22.13,22.23,22.43,22.24,22.29], 10), 22.25, 'testing real data');
  assert.equal(service.ema([24.05,23.75,23.83,23.95,23.63,23.82,23.87,23.65,23.19,23.10,23.33,
23.68,23.10,22.40,22.17], 10), 23, 'testing with real data but limited');
});

test('Relative Price Index', function(assert) {
  assert.expect(18);
  assert.equal(service.rsi([1,10,1], 0), 100, 'testing zero days selected');
  assert.equal(service.rsi([], 3), 100, 'testing empty array');
  assert.equal(service.rsi([1,1,1], 3), 100, 'testing days equal to array.length');
  assert.equal(service.rsi([1,1,1], 2), 100, 'testing days less than array.length');
  assert.equal(service.rsi([1,1,1], 4), 100, 'testing days greater than array.length');
  assert.equal(service.rsi([2,5,2], 3), 50, 'testing different numbers');
  assert.equal(service.rsi([2,5,2]), 50, 'testing optional limit');
  assert.equal(service.rsi([2,4,7,4], 3), 63, 'testing larger arrays');
  assert.equal(service.rsi([2,4,728,4,10,2,6], 5), 50, 'testing larger inputs');
  assert.equal(service.rsi([1,2,3,4,5,6,7,8,9,10], 10), 100, 'testing larger inputs');
  assert.equal(service.rsi([10,9,8,7,6,5,4,3,2,1], 10), 0, 'testing larger inputs');
  assert.equal(service.rsi([2,4,6,4,10,3,728], 5), 99, 'testing larger inputs');
  assert.equal(service.rsi([1,2,3,4,5], 200), 100, 'testing large days selection');
  assert.equal(service.rsi([1,2,3,4,6,2,63,5], 200), 52, 'testing decimal output');
  assert.equal(service.rsi([1.45,2.25,3.12,4.76,6.2,2.3,63.9,5.6], 200), 52, 'testing decimal input');
  assert.equal(service.rsi([4,5,2], 3), 25, 'testing rounding of repeating decimal output');
  assert.equal(service.rsi([22.27,22.19,22.08,22.17,22.18,22.13,22.23,22.43,22.24,22.29], 10), 51, 'testing real data');
  assert.equal(service.rsi([24.05,23.75,23.83,23.95,23.63,23.82,23.87,23.65,23.19,23.10,23.33,
    23.68,23.10,22.40,22.17], 10), 26, 'testing with real data but limited');
});
