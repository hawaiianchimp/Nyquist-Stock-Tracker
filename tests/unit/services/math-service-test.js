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
	assert.expect(16);
	assert.equal(service.movingAverage(0, [1,10,1]), 0, 'movingAverage(0, [1,10,1]) should be 0');
	assert.equal(service.movingAverage(3, []), 0, 'movingAverage(3, []) should be 0');
	assert.equal(service.movingAverage(0, undefined), 0, 'movingAverage(0, undefined) should be 0');
	assert.equal(service.movingAverage(200, '11,2,3,4,5'), 3, 'movingAverage(200, "1,2,3,4,5") should be 3');
	assert.equal(service.movingAverage('200', '1,2,3,4,5'), 3, 'movingAverage("200", "1,2,3,4,5") should be 3');
	assert.equal(service.movingAverage('200', [1,2,3,4,5]), 3, 'movingAverage("200", [1,2,3,4,5]) should be 3');
	assert.equal(service.movingAverage('2', 'cheeseburger'), 0, 'movingAverage("2", "cheeseburger") should be 0');
	assert.equal(service.movingAverage(3, 1), 1, 'movingAverage(3, 1) should be 1');
	assert.equal(service.movingAverage(3, [1,1,1]), 1, 'movingAverage(3, [1,1,1]) should be 1');
	assert.equal(service.movingAverage(2, [1,1,1]), 1, 'movingAverage(2, [1,1,1]) should be 1');
	assert.equal(service.movingAverage(4, [1,1,1]), 1, 'movingAverage(4, [1,1,1]) should be 1');
	assert.equal(service.movingAverage(3, [2,5,2]), 3, 'movingAverage(3, [2,5,2]) should be 3');
	assert.equal(service.movingAverage(3, [2,4,7,4]), 5, 'movingAverage(3, [2,4,7,4]) should be 5');
	assert.equal(service.movingAverage(3, [2,4,7,4,10,2,6]), 6, 'movingAverage(3, [2,4,7,4,10,2,6]) should be 6');
	assert.equal(service.movingAverage(200, [1,2,3,4,5]), 3, 'movingAverage(3, [1,2,3,4,5]) should be 3');
	assert.equal(service.movingAverage(200, [1,2,3,4,5]), 3, 'movingAverage(3, [1,2,3,4,5]) should be 3');
});

