import Ember from 'ember';

export default Ember.Route.extend({
  input: Ember.inject.service('math-service'),
  makeArrays() {},
  model() {
    this.get('store').query('price', {
      company: 'lnkd'}
      );
    return [
      ['Year', 'Sales', 'Expenses'],
      ['2004', 1100, 400],
      ['2005', 1170, 460],
      ['2006', 1160, 112],
      ['2007', 1130, 'ls'],
    ];
  }

});