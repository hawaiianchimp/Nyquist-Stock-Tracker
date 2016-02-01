import Ember from 'ember';
//import TimeSeriesGraphComponent from 'ember-charts';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['graph'],
  input: Ember.inject.service('input-service'),
  math: Ember.inject.service('math-service'),
  dataInput: '1,2,3,4',
  daysInput: 200,
  points: Ember.computed('dataInput', 'days', function(){
    return this.get('input').convertToArray(this.get('dataInput'));
  }),
  days: Ember.computed('daysInput', function(){
    return this.get('input').convertToInteger(this.get('daysInput'));
  }),
  movingAverage: Ember.computed('days', 'points', function(){
    return this.get('math').smaLine(this.get('points'), this.get('days'));
  }),
  exponentialMovingAverage: Ember.computed('days', 'points', function(){
    return this.get('math').emaLine(this.get('points'), this.get('days'));
  })
});
