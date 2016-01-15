import { moduleFor, test } from 'ember-qunit';

let service;

moduleFor('service:math-service', 'Unit | Service | math service', {
  // Specify the other units that are required for this test.
  needs: ['service:inputService'],
	beforeEach() {
		service = this.subject();
	}
});

test('movingAverage', function(assert) {
	assert.expect(18);
	assert.equal(service.movingAverage(0, [1,10,1]), 0, 'testing zero days selected');
	assert.equal(service.movingAverage(3, []), 0, 'testing empty array');
	assert.equal(service.movingAverage(0, undefined), 0, 'testing undefined input');
	assert.equal(service.movingAverage(200, '1,2,3,4,5'), 3, 'testing days greater than array.length');
	assert.equal(service.movingAverage('200', '1,2,3,4,5'), 3, 'testing string inputs');
	assert.equal(service.movingAverage('200', [1,2,3,4,5]), 3, 'testing array inputs');
	assert.equal(service.movingAverage('2', 'cheeseburger'), 0, 'testing nonsense string input');
	assert.equal(service.movingAverage(3, 1), 1, 'testing single number input');
	assert.equal(service.movingAverage(3, [1,1,1]), 1, 'testing days equal to array.length');
	assert.equal(service.movingAverage(2, [1,1,1]), 1, 'testing days less than array.length');
	assert.equal(service.movingAverage(4, [1,1,1]), 1, 'testing days greating than array.length');
	assert.equal(service.movingAverage(3, [2,5,2]), 3, 'testing different numbers');
	assert.equal(service.movingAverage(3, [2,4,7,4]), 5, 'testing larger arrays');
	assert.equal(service.movingAverage(5, [2,4,728,4,10,2,6]), 150, 'testing larger inputs');
	assert.equal(service.movingAverage(200, [1,2,3,4,5]), 3, 'testing large days selection');
	assert.equal(service.movingAverage(200, [1,2,3,4,6,2,63,5]), 10.75, 'testing decimal output');
	assert.equal(service.movingAverage(200, [1.45,2.25,3.12,4.76,6.2,2.3,63.9,5.6]), 11.1975, 'testing decimal input');
	assert.equal(service.movingAverage(3, [4,5,2]), 3.6667, 'testing rounding of repeating decimal output');
});

