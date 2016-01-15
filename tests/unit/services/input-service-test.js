import { moduleFor, test } from 'ember-qunit';

let service;

moduleFor('service:input-service', 'Unit | Service | input', {
  // Specify the other units that are required for this test.
  //needs: ['service:input']
  beforeEach() {
  service = this.subject();
}
});

test('convert text to array', function(assert) {
  assert.expect(1);
  assert.equal(service.convertToArray('1,2,3,4,5').toString(), [1,2,3,4,5].toString(), 'Converted "1,2,3,4,5" to [1,2,3,4,5]');
});